"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_array_1 = require("@ionic/utils-array");
const Debug = require("debug");
const lodash = require("lodash");
const guards_1 = require("../guards");
const format_1 = require("../utils/format");
const colors_1 = require("./colors");
const options_1 = require("./options");
const validators_1 = require("./validators");
const debug = Debug('ionic:cli-framework:lib:help');
const DEFAULT_DOTS_WIDTH = 32;
function formatHelpGroups(groups = [], colors = colors_1.DEFAULT_COLORS) {
    const { help: { group: gcolors } } = colors;
    return groups
        .map(g => g in gcolors ? gcolors[g](`(${g})`) + ' ' : '')
        .join('');
}
function formatLinkFootnote(footnote, colors = colors_1.DEFAULT_COLORS) {
    const { strong } = colors;
    return strong(footnote.shortUrl ? footnote.shortUrl : footnote.url);
}
function formatFootnote(index, footnote, colors = colors_1.DEFAULT_COLORS) {
    const { ancillary } = colors;
    const prefix = ancillary(`[${index}]`);
    const output = guards_1.isLinkFootnote(footnote) ? formatLinkFootnote(footnote, colors) : footnote.text;
    return `${prefix}: ${output}`;
}
function formatFootnotes(text, footnotes, colors = colors_1.DEFAULT_COLORS) {
    if (!footnotes) {
        return text;
    }
    const { ancillary } = colors;
    const discoveredFootnotes = [];
    const output = text.replace(/\[\^([A-z0-9-]+)\]/g, (match, p1) => {
        const m = Number.parseInt(p1, 10);
        const id = !Number.isNaN(m) ? m : p1;
        const foundFootnote = footnotes.find(footnote => footnote.id === id);
        if (foundFootnote) {
            const len = discoveredFootnotes.push(foundFootnote);
            return ancillary(`[${len}]`);
        }
        else {
            debug('No footnote found by ID: %O', id);
            return '';
        }
    });
    return output + (discoveredFootnotes.length > 0 ?
        `\n\n${discoveredFootnotes.map((footnote, i) => formatFootnote(i + 1, footnote, colors)).join('\n')}` :
        '');
}
async function isOptionVisible(opt) {
    return !opt.groups || !opt.groups.includes("hidden" /* HIDDEN */);
}
exports.isOptionVisible = isOptionVisible;
async function isCommandVisible(cmd) {
    const ns = await cmd.namespace.getMetadata();
    return (!cmd.groups || !cmd.groups.includes("hidden" /* HIDDEN */)) && (!ns.groups || !ns.groups.includes("hidden" /* HIDDEN */));
}
exports.isCommandVisible = isCommandVisible;
class HelpFormatter {
    constructor({ colors }) {
        this.colors = colors ? colors : colors_1.DEFAULT_COLORS;
    }
}
exports.HelpFormatter = HelpFormatter;
class NamespaceHelpFormatter extends HelpFormatter {
    constructor({ location, namespace, colors }) {
        super({ colors });
        this.dotswidth = DEFAULT_DOTS_WIDTH;
        this.location = location;
        this.namespace = namespace;
    }
    normalizeMetadata(metadata) {
        return { ...metadata, groups: lodash.uniq(metadata.groups) };
    }
    normalizeCommandMetadata(metadata) {
        return { ...metadata, groups: lodash.uniq(metadata.groups) };
    }
    /**
     * Given command metadata, decide whether to keep or discard the command that
     * the metadata represents.
     *
     * @param meta: The metadata of the command.
     * @return `true` to keep, `false` to discard
     */
    async filterCommandCallback(meta) {
        return isCommandVisible(meta);
    }
    async getNamespaceMetadata() {
        if (!this._metadata) {
            this._metadata = this.normalizeMetadata(await this.namespace.getMetadata());
        }
        return this._metadata;
    }
    async getCommandMetadataList() {
        const commands = await this.namespace.getCommandMetadataList();
        return commands.map(cmd => this.normalizeCommandMetadata(cmd));
    }
    async getNamespaceFullName() {
        if (!this._fullName) {
            const parts = await utils_array_1.map(this.location.path.slice(0, this.location.path.length - 1), async ([, cmd]) => (await cmd.getMetadata()).name);
            const name = (await this.getNamespaceMetadata()).name;
            this._fullName = [...parts, name].join(' ');
        }
        return this._fullName;
    }
}
exports.NamespaceHelpFormatter = NamespaceHelpFormatter;
class NamespaceStringHelpFormatter extends NamespaceHelpFormatter {
    async formatHeader() {
        const { strong, input } = this.colors;
        const fullName = await this.getNamespaceFullName();
        const summary = await this.formatSummary();
        const description = await this.formatDescription();
        return (`\n  ${strong(`${input(fullName)}${summary}`)}` +
            (description ? `\n\n    ${description}` : '') + '\n');
    }
    async formatSummary() {
        const fullName = await this.getNamespaceFullName();
        const metadata = await this.getNamespaceMetadata();
        const summary = ((await this.formatBeforeSummary(metadata)) +
            metadata.summary +
            (await this.formatAfterSummary(metadata)));
        const wrappedSummary = format_1.wordWrap(summary, { indentation: fullName.length + 5 });
        return wrappedSummary ? ` - ${wrappedSummary}` : '';
    }
    async formatDescription() {
        const metadata = await this.getNamespaceMetadata();
        if (!metadata.description) {
            return '';
        }
        const text = formatFootnotes(metadata.description.trim(), metadata.footnotes, this.colors);
        return format_1.wordWrap(text, { indentation: 4 });
    }
    async getGlobalOptions() {
        return [];
    }
    async formatUsage() {
        const { help: { title }, weak, input } = this.colors;
        const fullName = await this.getNamespaceFullName();
        const options = ['--help', ...(await this.getGlobalOptions())];
        const usageLines = [
            `<command> ${weak('[<args>]')} ${options.map(opt => weak('[' + opt + ']')).join(' ')} ${weak('[options]')}`,
        ];
        return (`\n  ${title('Usage')}:` +
            `\n\n    ${usageLines.map(u => `${weak('$')} ${input(fullName + ' ' + u)}`).join('\n    ')}\n`);
    }
    async formatCommands() {
        const commands = await this.getCommandMetadataList();
        return this.formatCommandGroup('Commands', commands);
    }
    async formatCommandGroup(titleText, commands) {
        const { help: { title } } = this.colors;
        const filteredCommands = await utils_array_1.filter(commands, async (cmd) => this.filterCommandCallback(cmd));
        const [cmdDetails, nsDetails] = await Promise.all([
            this.getListOfCommandDetails(filteredCommands.filter(cmd => cmd.namespace === this.namespace)),
            this.getListOfNamespaceDetails(filteredCommands.filter(cmd => cmd.namespace !== this.namespace)),
        ]);
        const details = [...cmdDetails, ...nsDetails];
        if (details.length === 0) {
            return '';
        }
        details.sort();
        return (`\n  ${title(titleText)}:` +
            `\n\n    ${details.join('\n    ')}\n`);
    }
    async getListOfCommandDetails(commands) {
        const { weak, input } = this.colors;
        const fullCmd = commands.map(cmd => lodash.tail(cmd.path).map(([p]) => p).join(' '));
        const fillStringArray = format_1.generateFillSpaceStringList(fullCmd, this.dotswidth, weak('.'));
        const formattedCommands = await Promise.all(commands.map(async (cmd, index) => {
            const wrapColor = cmd.groups && cmd.groups.includes("deprecated" /* DEPRECATED */) ? weak : lodash.identity;
            const summary = ((await this.formatBeforeCommandSummary(cmd)) +
                cmd.summary +
                (await this.formatAfterCommandSummary(cmd)));
            const wrappedSummary = format_1.wordWrap(summary, { indentation: this.dotswidth + 6 });
            const line = `${input(lodash.tail(cmd.path).map(([p]) => p).join(' '))}${wrappedSummary ? ' ' + fillStringArray[index] + ' ' + wrappedSummary : ''}`;
            return wrapColor(line);
        }));
        return formattedCommands;
    }
    async getListOfNamespaceDetails(commands) {
        const { weak, input } = this.colors;
        const namespaces = await this.namespace.groupCommandsByNamespace(commands);
        const fillStringArray = format_1.generateFillSpaceStringList(namespaces.map(({ name }) => name + ' <subcommand>'), this.dotswidth, weak('.'));
        const formattedNamespaces = await Promise.all(namespaces.map(async (meta, i) => {
            const summary = ((await this.formatBeforeNamespaceSummary(meta, meta.commands)) +
                meta.summary +
                (await this.formatAfterNamespaceSummary(meta, meta.commands)));
            const wrappedSummary = format_1.wordWrap(summary, { indentation: this.dotswidth + 6 });
            return `${input(meta.name + ' <subcommand>')}${wrappedSummary ? ' ' + fillStringArray[i] + ' ' + wrappedSummary : ''}`;
        }));
        return formattedNamespaces;
    }
    /**
     * Insert text before the namespace's summary.
     *
     * @param meta: The metadata of the namespace.
     */
    async formatBeforeSummary(meta) {
        return formatHelpGroups(meta.groups, this.colors);
    }
    /**
     * Insert text after the namespace's summary.
     *
     * @param meta: The metadata of the namespace.
     */
    async formatAfterSummary(meta) {
        return '';
    }
    /**
     * Insert text that appears before a commands's summary.
     *
     * @param meta: The metadata of the command.
     */
    async formatBeforeCommandSummary(meta) {
        return formatHelpGroups(meta.groups, this.colors);
    }
    /**
     * Insert text that appears after a commands's summary.
     *
     * @param meta: The metadata of the command.
     */
    async formatAfterCommandSummary(meta) {
        const { weak, input } = this.colors;
        const aliases = meta.aliases.map(alias => lodash.tail(alias.split(' ')).join(' '));
        const formattedAliases = aliases.length > 0 ? weak('(alias' + (aliases.length === 1 ? '' : 'es') + ': ') + aliases.map(a => input(a)).join(', ') + weak(')') : '';
        return formattedAliases ? ` ${formattedAliases}` : '';
    }
    /**
     * Insert text that appears before a namespace's summary.
     *
     * @param meta The metadata of the namespace.
     * @param commands An array of the metadata of the namespace's commands.
     */
    async formatBeforeNamespaceSummary(meta, commands) {
        return formatHelpGroups(meta.groups, this.colors);
    }
    /**
     * Insert text that appears after a namespace's summary.
     *
     * @param meta The metadata of the namespace.
     * @param commands An array of the metadata of the namespace's commands.
     */
    async formatAfterNamespaceSummary(meta, commands) {
        const { weak, input } = this.colors;
        const formattedSubcommands = commands.length > 0 ? `${weak('(subcommands:')} ${commands.map(c => input(c.name)).join(', ')}${weak(')')}` : '';
        const formattedAliases = meta.aliases.length > 0 ? `${weak('(alias' + (meta.aliases.length === 1 ? '' : 'es') + ': ') + meta.aliases.map(a => input(a)).join(', ') + weak(')')}` : '';
        return `${formattedSubcommands ? ` ${formattedSubcommands}` : ''}${formattedAliases ? ` ${formattedAliases}` : ''}`;
    }
    async format() {
        return ((await this.formatHeader()) +
            (await this.formatUsage()) +
            (await this.formatCommands()) +
            '\n');
    }
}
exports.NamespaceStringHelpFormatter = NamespaceStringHelpFormatter;
class CommandHelpFormatter extends HelpFormatter {
    constructor({ location, command, metadata, colors }) {
        super({ colors });
        this.dotswidth = DEFAULT_DOTS_WIDTH;
        this.location = location;
        this.command = command;
        this._metadata = metadata ? this.normalizeMetadata(metadata) : undefined;
    }
    normalizeMetadata(metadata) {
        return { ...metadata, groups: lodash.uniq(metadata.groups) };
    }
    /**
     * Given an option definition from command metadata, decide whether to keep
     * or discard it.
     *
     * @return `true` to keep, `false` to discard
     */
    async filterOptionCallback(option) {
        return isOptionVisible(option);
    }
    async getCommandMetadata() {
        if (!this._metadata) {
            this._metadata = this.normalizeMetadata(await this.command.getMetadata({ location: this.location }));
        }
        return this._metadata;
    }
    async getCommandFullName() {
        if (!this._fullName) {
            const parts = await utils_array_1.map(this.location.path.slice(0, this.location.path.length - 1), async ([, cmd]) => (await cmd.getMetadata()).name);
            const name = (await this.getCommandMetadata()).name;
            this._fullName = [...parts, name].join(' ');
        }
        return this._fullName;
    }
}
exports.CommandHelpFormatter = CommandHelpFormatter;
class CommandStringHelpFormatter extends CommandHelpFormatter {
    async formatHeader() {
        const { strong, input } = this.colors;
        const fullName = await this.getCommandFullName();
        const summary = await this.formatSummary();
        const description = await this.formatDescription();
        return (`\n  ${strong(`${input(fullName)}${summary}`)}` +
            (description ? `\n\n    ${description}` : '') + '\n');
    }
    async formatSummary() {
        const fullName = await this.getCommandFullName();
        const metadata = await this.getCommandMetadata();
        const summary = ((await this.formatBeforeSummary(metadata)) +
            metadata.summary +
            (await this.formatAfterSummary(metadata)));
        const wrappedSummary = format_1.wordWrap(summary, { indentation: fullName.length + 5 });
        return wrappedSummary ? ` - ${wrappedSummary}` : '';
    }
    async formatDescription() {
        const metadata = await this.getCommandMetadata();
        if (!metadata.description) {
            return '';
        }
        const text = formatFootnotes(metadata.description.trim(), metadata.footnotes, this.colors);
        return format_1.wordWrap(text, { indentation: 4 });
    }
    async formatInlineInput(input) {
        if (input.validators && input.validators.includes(validators_1.validators.required)) {
            return '<' + input.name + '>';
        }
        return '[<' + input.name + '>]';
    }
    async formatUsage() {
        const { help: { title }, weak, input } = this.colors;
        const fullName = await this.getCommandFullName();
        const metadata = await this.getCommandMetadata();
        const options = metadata.options ? metadata.options : [];
        const filteredOptions = await utils_array_1.filter(options, async (opt) => this.filterOptionCallback(opt));
        const formattedInputs = metadata.inputs ? await Promise.all(metadata.inputs.map(async (i) => this.formatInlineInput(i))) : [];
        return (`\n  ${title('Usage')}:` +
            `\n\n    ${weak('$')} ${input(fullName + (formattedInputs.length > 0 ? ' ' + formattedInputs.join(' ') : ''))}${filteredOptions.length > 0 ? ' ' + input('[options]') : ''}\n`);
    }
    async formatInputs() {
        const { help: { title }, weak, input } = this.colors;
        const metadata = await this.getCommandMetadata();
        const inputs = metadata.inputs ? metadata.inputs : [];
        if (inputs.length === 0) {
            return '';
        }
        const fillStrings = format_1.generateFillSpaceStringList(inputs.map(i => i.name), this.dotswidth, weak('.'));
        const inputLineFn = ({ name, summary }, index) => {
            const optionList = input(`${name}`);
            const wrappedSummary = format_1.wordWrap(summary, { indentation: this.dotswidth + 6 });
            return `${optionList} ${fillStrings[index]} ${wrappedSummary}`;
        };
        return (`\n  ${title('Inputs')}:` +
            `\n\n    ${inputs.map(inputLineFn).join('\n    ')}\n`);
    }
    async formatOptionLine(opt) {
        const { weak } = this.colors;
        const wrapColor = opt.groups && opt.groups.includes("deprecated" /* DEPRECATED */) ? weak : lodash.identity;
        const optionName = options_1.formatOptionName(opt, { colors: this.colors });
        const optionNameLength = format_1.stringWidth(optionName);
        const fullLength = optionNameLength > this.dotswidth ? optionNameLength + 1 : this.dotswidth;
        const fullDescription = ((await this.formatBeforeOptionSummary(opt)) +
            opt.summary +
            (await this.formatAfterOptionSummary(opt)));
        const wrappedDescription = format_1.wordWrap(fullDescription, { indentation: this.dotswidth + 6 });
        const line = `${optionName} ${weak('.').repeat(fullLength - optionNameLength)} ${wrappedDescription}`;
        return wrapColor(line);
    }
    /**
     * Insert text before the command's summary.
     *
     * @param meta The metadata of the command.
     */
    async formatBeforeSummary(meta) {
        return formatHelpGroups(meta.groups, this.colors);
    }
    /**
     * Insert text after the command's summary.
     *
     * @param meta The metadata of the command.
     */
    async formatAfterSummary(meta) {
        return '';
    }
    /**
     * Insert text that appears before an option's summary.
     *
     * @param opt The metadata of the option.
     */
    async formatBeforeOptionSummary(opt) {
        return formatHelpGroups(opt.groups, this.colors);
    }
    async formatAfterOptionSummary(opt) {
        return this.formatOptionDefault(opt);
    }
    async formatOptionDefault(opt) {
        const { weak, input } = this.colors;
        if (typeof opt.default === 'string') {
            return weak(' (default: ') + input(opt.default) + weak(')');
        }
        else {
            return '';
        }
    }
    async formatOptions() {
        const metadata = await this.getCommandMetadata();
        const options = metadata.options ? metadata.options : [];
        return this.formatOptionsGroup('Options', options);
    }
    async formatOptionsGroup(titleText, options) {
        const { help: { title } } = this.colors;
        const filteredOptions = await utils_array_1.filter(options, async (opt) => this.filterOptionCallback(opt));
        if (filteredOptions.length === 0) {
            return '';
        }
        const formattedOptions = await Promise.all(filteredOptions.map(async (option) => this.formatOptionLine(option)));
        return (`\n  ${title(titleText)}:` +
            `\n\n    ${formattedOptions.join('\n    ')}\n`);
    }
    async formatExamples() {
        const { help: { title }, weak, input } = this.colors;
        const metadata = await this.getCommandMetadata();
        const fullName = await this.getCommandFullName();
        if (!metadata.exampleCommands || !Array.isArray(metadata.exampleCommands)) {
            return '';
        }
        const exampleLines = metadata.exampleCommands.map(cmd => {
            const sepIndex = cmd.indexOf(' -- ');
            cmd = sepIndex === -1 ? input(cmd) : input(cmd.substring(0, sepIndex)) + cmd.substring(sepIndex);
            const wrappedCmd = format_1.wordWrap(cmd, { indentation: 12, append: ' \\' });
            return `${weak('$')} ${input(fullName + ' ')}${wrappedCmd ? wrappedCmd : ''}`;
        });
        return (`\n  ${title('Examples')}:` +
            `\n\n    ${exampleLines.join('\n    ')}\n`);
    }
    async format() {
        return ((await this.formatHeader()) +
            (await this.formatUsage()) +
            (await this.formatInputs()) +
            (await this.formatOptions()) +
            (await this.formatExamples()) +
            '\n');
    }
}
exports.CommandStringHelpFormatter = CommandStringHelpFormatter;
class NamespaceSchemaHelpFormatter extends NamespaceHelpFormatter {
    async format() {
        return JSON.stringify(await this.serialize());
    }
    async serialize() {
        const metadata = await this.getNamespaceMetadata();
        const commands = await this.getCommandMetadataList();
        return {
            name: metadata.name,
            summary: metadata.summary,
            description: metadata.description ? metadata.description : '',
            groups: metadata.groups ? metadata.groups : [],
            commands: await this.formatCommandGroup(commands),
            aliases: [],
        };
    }
    async formatCommandGroup(commands) {
        const filteredCommands = await utils_array_1.filter(commands, async (cmd) => this.filterCommandCallback(cmd));
        return utils_array_1.map(filteredCommands, async (cmd) => this.formatCommand(cmd));
    }
    async formatCommand(cmd) {
        const { command } = cmd;
        const formatter = new CommandSchemaHelpFormatter({
            location: { path: [...cmd.path], obj: command, args: [] },
            command,
            metadata: cmd,
        });
        return formatter.serialize();
    }
}
exports.NamespaceSchemaHelpFormatter = NamespaceSchemaHelpFormatter;
class CommandSchemaHelpFormatter extends CommandHelpFormatter {
    async format() {
        return JSON.stringify(await this.serialize());
    }
    async serialize() {
        const metadata = await this.getCommandMetadata();
        return this.formatCommand(metadata);
    }
    async formatInputs(inputs) {
        return Promise.all(inputs.map(async (input) => this.formatInput(input)));
    }
    async formatInput(input) {
        const name = input.name;
        const summary = input.summary;
        const required = input.validators && input.validators.includes(validators_1.validators.required) ? true : false;
        return { name, summary, required };
    }
    async formatOptions(options) {
        const filteredOptions = await utils_array_1.filter(options, async (opt) => this.filterOptionCallback(opt));
        return Promise.all(filteredOptions.map(async (opt) => this.formatOption(opt)));
    }
    async formatOption(option) {
        const name = option.name;
        const summary = option.summary ? option.summary.trim() : '';
        const groups = option.groups ? option.groups : [];
        const aliases = option.aliases ? option.aliases : [];
        const type = option.type ? option.type.name.toLowerCase() : 'string';
        const spec = options_1.hydrateOptionSpec(option);
        return { name, type, summary, default: option.default, groups, aliases, spec };
    }
    formatFootnote(footnote) {
        return guards_1.isLinkFootnote(footnote) ? ({ type: 'link', ...footnote }) : ({ type: 'text', ...footnote });
    }
    async formatCommand(cmd) {
        const commandPath = this.location.path.map(([p]) => p);
        const namespacePath = lodash.initial(commandPath);
        const name = commandPath.join(' ');
        const summary = cmd.summary ? cmd.summary.trim() : '';
        const description = cmd.description ? cmd.description.trim() : '';
        const footnotes = cmd.footnotes ? cmd.footnotes.map(footnote => this.formatFootnote(footnote)) : [];
        const groups = cmd.groups ? cmd.groups : [];
        const exampleCommands = cmd.exampleCommands ? cmd.exampleCommands.map(c => `${name} ${c}`) : [];
        const aliases = guards_1.isHydratedCommandMetadata(cmd) ? cmd.aliases : [];
        const inputs = cmd.inputs ? await this.formatInputs(cmd.inputs) : [];
        const options = cmd.options ? await this.formatOptions(cmd.options) : [];
        return { name, namespace: namespacePath, summary, description, footnotes, groups, exampleCommands, aliases, inputs, options };
    }
}
exports.CommandSchemaHelpFormatter = CommandSchemaHelpFormatter;
function createCommandMetadataFromSchema(schema) {
    return {
        name: schema.name,
        summary: schema.summary,
        description: schema.description,
        footnotes: [...schema.footnotes],
        groups: [...schema.groups],
        exampleCommands: [...schema.exampleCommands],
        inputs: [...schema.inputs],
        options: schema.options.map(opt => ({ ...opt, type: opt.type === 'boolean' ? Boolean : String, groups: [...opt.groups], aliases: [...opt.aliases] })),
    };
}
exports.createCommandMetadataFromSchema = createCommandMetadataFromSchema;
