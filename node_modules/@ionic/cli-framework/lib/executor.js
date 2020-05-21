"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const lodash = require("lodash");
const errors_1 = require("../errors");
const guards_1 = require("../guards");
const colors_1 = require("./colors");
const help_1 = require("./help");
const options_1 = require("./options");
exports.EXECUTOR_OPS = Object.freeze({
    RPC: '📡',
});
exports.HELP_FLAGS = ['--help', '-?'];
class AbstractExecutor extends events_1.EventEmitter {
    async resolveExecuteInput(argvOrLocation) {
        if ('obj' in argvOrLocation) {
            return [argvOrLocation, [...argvOrLocation.args]];
        }
        else {
            return [await this.locate(argvOrLocation), [...argvOrLocation]];
        }
    }
}
exports.AbstractExecutor = AbstractExecutor;
class BaseExecutor extends AbstractExecutor {
    constructor({ namespace, stdout, stderr, colors }) {
        super();
        this.namespace = namespace;
        this.colors = colors ? colors : colors_1.DEFAULT_COLORS;
        this.stdout = stdout ? stdout : process.stdout;
        this.stderr = stderr ? stderr : process.stderr;
    }
    /**
     * Locate a command or namespace given an array of positional arguments
     * (argv).
     *
     * @param argv Command arguments sliced to the root for the namespace of this
     *             executor. Usually, this means `process.argv.slice(2)`.
     */
    async locate(argv) {
        const parsedArgs = options_1.stripOptions(argv, {});
        const location = await this.namespace.locate(parsedArgs);
        const args = lodash.drop(argv, location.path.length - 1);
        return { ...location, args };
    }
    /**
     * Locate and execute a command given an array of positional command
     * arguments (argv) and a set of environment variables.
     *
     * If a command is not found, formatted help is automatically output for the
     * right-most namespace found.
     *
     * @param argv Command arguments sliced to the root for the namespace of this
     *             executor. Usually, this means `process.argv.slice(2)`.
     * @param env Environment variables for this execution.
     */
    async execute(argvOrLocation, env) {
        if (Array.isArray(argvOrLocation) && argvOrLocation[0] === exports.EXECUTOR_OPS.RPC) {
            return this.rpc();
        }
        const [location, argv] = await this.resolveExecuteInput(argvOrLocation);
        if (lodash.intersection(exports.HELP_FLAGS, argv).length > 0 || guards_1.isNamespace(location.obj)) {
            const cmdoptions = options_1.parseArgs(argv);
            this.stdout.write(await this.formatHelp(location, { format: cmdoptions['json'] ? 'json' : 'terminal' }));
        }
        else {
            const cmd = location.obj;
            const cmdargs = location.args;
            await this.run(cmd, cmdargs, { location, env, executor: this });
        }
    }
    async run(command, cmdargs, runinfo) {
        const { input } = this.colors;
        const metadata = await command.getMetadata();
        const cmdoptions = options_1.parseArgs([...cmdargs], options_1.metadataOptionsToParseArgsOptions(metadata.options ? metadata.options : []));
        const cmdinputs = cmdoptions._;
        try {
            await command.validate(cmdinputs);
        }
        catch (e) {
            if (e instanceof errors_1.InputValidationError) {
                for (const err of e.errors) {
                    this.stderr.write(`${err.message}\n`);
                }
                this.stderr.write(`Use the ${input('--help')} flag for more details.\n`);
            }
            throw e;
        }
        await command.run(cmdinputs, cmdoptions, runinfo);
    }
    async formatHelp(location, { format = 'terminal' } = {}) {
        let formatter;
        if (guards_1.isCommand(location.obj)) {
            const options = { location, command: location.obj, colors: this.colors };
            formatter = format === 'json' ? new help_1.CommandSchemaHelpFormatter(options) : new help_1.CommandStringHelpFormatter(options);
        }
        else {
            const options = { location, namespace: location.obj, colors: this.colors };
            formatter = format === 'json' ? new help_1.NamespaceSchemaHelpFormatter(options) : new help_1.NamespaceStringHelpFormatter(options);
        }
        return formatter.format();
    }
    /**
     * Initiate RPC operation.
     *
     * This means the CLI has been executed by a parent Node process with an IPC
     * channel, allowing request/response communication via RPC.
     */
    async rpc() {
        const { RPCProcess } = await Promise.resolve().then(() => require('../utils/ipc'));
        const metadata = await this.namespace.getMetadata();
        const rpc = new RPCProcess({ name: metadata.name });
        rpc.register('help', async ([cmdpath]) => {
            const location = await this.namespace.locate(cmdpath);
            const formatter = guards_1.isCommand(location.obj)
                ? new help_1.CommandSchemaHelpFormatter({ location, command: location.obj, colors: this.colors })
                : new help_1.NamespaceSchemaHelpFormatter({ location, namespace: location.obj, colors: this.colors });
            return formatter.serialize();
        });
        this.emit('operation-rpc', rpc);
        rpc.start(process);
    }
}
exports.BaseExecutor = BaseExecutor;
class Executor extends BaseExecutor {
}
exports.Executor = Executor;
async function execute({ namespace, argv, env, ...rest }) {
    const executor = new BaseExecutor({ namespace, ...rest });
    try {
        await executor.execute(argv, env);
    }
    catch (e) {
        if (e instanceof errors_1.BaseError) {
            executor.stderr.write(`Error: ${e.message}`);
            process.exitCode = typeof e.exitCode === 'undefined' ? 1 : e.exitCode;
            return;
        }
        throw e;
    }
}
exports.execute = execute;
