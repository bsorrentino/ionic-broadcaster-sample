/// <reference types="node" />
import { EventEmitter } from 'events';
import { CommandInstanceInfo, CommandMetadata, CommandMetadataInput, CommandMetadataOption, ICommand, IExecutor, INamespace, NamespaceLocateResult } from '../definitions';
import { Colors } from './colors';
import { Command, Namespace } from './command';
import { CommandHelpSchema, NamespaceHelpSchema } from './help';
export declare type HelpRPC<S extends CommandHelpSchema | NamespaceHelpSchema> = import('../utils/ipc').RPC<'help', [readonly string[]], S>;
export interface ExecutorOperations {
    readonly RPC: string;
}
export declare const EXECUTOR_OPS: ExecutorOperations;
export declare const HELP_FLAGS: string[];
export declare abstract class AbstractExecutor<C extends ICommand<C, N, M, I, O>, N extends INamespace<C, N, M, I, O>, M extends CommandMetadata<I, O>, I extends CommandMetadataInput, O extends CommandMetadataOption> extends EventEmitter implements IExecutor<C, N, M, I, O> {
    abstract readonly namespace: N;
    abstract locate(argv: readonly string[]): Promise<NamespaceLocateResult<C, N, M, I, O>>;
    abstract execute(location: NamespaceLocateResult<C, N, M, I, O>): Promise<void>;
    abstract execute(argv: readonly string[], env: NodeJS.ProcessEnv): Promise<void>;
    abstract run(command: C, cmdargs: readonly string[], runinfo?: Partial<CommandInstanceInfo<C, N, M, I, O>>): Promise<void>;
    resolveExecuteInput(argvOrLocation: readonly string[] | NamespaceLocateResult<C, N, M, I, O>): Promise<[NamespaceLocateResult<C, N, M, I, O>, string[]]>;
}
export interface BaseExecutorFormatHelpOptions {
    format?: 'terminal' | 'json';
}
export interface BaseExecutorDeps<C extends ICommand<C, N, M, I, O>, N extends INamespace<C, N, M, I, O>, M extends CommandMetadata<I, O>, I extends CommandMetadataInput, O extends CommandMetadataOption> {
    readonly namespace: N;
    readonly colors?: Colors;
    readonly stdout?: NodeJS.WriteStream;
    readonly stderr?: NodeJS.WriteStream;
}
export interface BaseExecutor<C extends ICommand<C, N, M, I, O>, N extends INamespace<C, N, M, I, O>, M extends CommandMetadata<I, O>, I extends CommandMetadataInput, O extends CommandMetadataOption> extends AbstractExecutor<C, N, M, I, O> {
    on(event: 'operation-rpc', callback: (rpc: import('../utils/ipc').RPCProcess) => void): this;
    emit(event: 'operation-rpc', rpc: import('../utils/ipc').RPCProcess): boolean;
}
export declare class BaseExecutor<C extends ICommand<C, N, M, I, O>, N extends INamespace<C, N, M, I, O>, M extends CommandMetadata<I, O>, I extends CommandMetadataInput, O extends CommandMetadataOption> extends AbstractExecutor<C, N, M, I, O> {
    readonly colors: Colors;
    readonly namespace: N;
    readonly stdout: NodeJS.WriteStream;
    readonly stderr: NodeJS.WriteStream;
    constructor({ namespace, stdout, stderr, colors }: BaseExecutorDeps<C, N, M, I, O>);
    /**
     * Locate a command or namespace given an array of positional arguments
     * (argv).
     *
     * @param argv Command arguments sliced to the root for the namespace of this
     *             executor. Usually, this means `process.argv.slice(2)`.
     */
    locate(argv: readonly string[]): Promise<NamespaceLocateResult<C, N, M, I, O>>;
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
    execute(argvOrLocation: readonly string[] | NamespaceLocateResult<C, N, M, I, O>, env?: NodeJS.ProcessEnv): Promise<void>;
    run(command: C, cmdargs: readonly string[], runinfo?: Partial<CommandInstanceInfo<C, N, M, I, O>>): Promise<void>;
    formatHelp(location: NamespaceLocateResult<C, N, M, I, O>, { format }?: BaseExecutorFormatHelpOptions): Promise<string>;
    /**
     * Initiate RPC operation.
     *
     * This means the CLI has been executed by a parent Node process with an IPC
     * channel, allowing request/response communication via RPC.
     */
    rpc(): Promise<void>;
}
export declare class Executor extends BaseExecutor<Command, Namespace, CommandMetadata, CommandMetadataInput, CommandMetadataOption> {
}
export declare function execute<C extends ICommand<C, N, M, I, O>, N extends INamespace<C, N, M, I, O>, M extends CommandMetadata<I, O>, I extends CommandMetadataInput, O extends CommandMetadataOption>({ namespace, argv, env, ...rest }: {
    namespace: N;
    argv: string[];
    env: NodeJS.ProcessEnv;
} & Partial<BaseExecutorDeps<C, N, M, I, O>>): Promise<void>;
