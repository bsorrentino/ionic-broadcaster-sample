import { CommandMetadata, CommandMetadataInput, CommandMetadataOption, Footnote, HydratedCommandMetadata, HydratedNamespaceMetadata, ICommand, INamespace, NamespaceLocateResult, NamespaceMetadata } from '../definitions';
import { Colors } from './colors';
export declare function isOptionVisible<O extends CommandMetadataOption>(opt: O): Promise<boolean>;
export declare function isCommandVisible<C extends ICommand<C, N, M, I, O>, N extends INamespace<C, N, M, I, O>, M extends CommandMetadata<I, O>, I extends CommandMetadataInput, O extends CommandMetadataOption>(cmd: HydratedCommandMetadata<C, N, M, I, O>): Promise<boolean>;
export declare abstract class HelpFormatter {
    protected readonly colors: Colors;
    constructor({ colors }: {
        colors?: Colors;
    });
    abstract format(): Promise<string>;
}
export interface NamespaceHelpFormatterDeps<C extends ICommand<C, N, M, I, O>, N extends INamespace<C, N, M, I, O>, M extends CommandMetadata<I, O>, I extends CommandMetadataInput, O extends CommandMetadataOption> {
    readonly location: NamespaceLocateResult<C, N, M, I, O>;
    readonly namespace: N;
    readonly colors?: Colors;
}
export declare abstract class NamespaceHelpFormatter<C extends ICommand<C, N, M, I, O>, N extends INamespace<C, N, M, I, O>, M extends CommandMetadata<I, O>, I extends CommandMetadataInput, O extends CommandMetadataOption> extends HelpFormatter {
    protected readonly location: NamespaceLocateResult<C, N, M, I, O>;
    protected readonly namespace: N;
    protected readonly dotswidth: number;
    protected _metadata?: NamespaceMetadata;
    protected _fullName?: string;
    constructor({ location, namespace, colors }: NamespaceHelpFormatterDeps<C, N, M, I, O>);
    protected normalizeMetadata(metadata: NamespaceMetadata): NamespaceMetadata;
    protected normalizeCommandMetadata(metadata: HydratedCommandMetadata<C, N, M, I, O>): HydratedCommandMetadata<C, N, M, I, O>;
    /**
     * Given command metadata, decide whether to keep or discard the command that
     * the metadata represents.
     *
     * @param meta: The metadata of the command.
     * @return `true` to keep, `false` to discard
     */
    filterCommandCallback(meta: HydratedCommandMetadata<C, N, M, I, O>): Promise<boolean>;
    getNamespaceMetadata(): Promise<NamespaceMetadata>;
    getCommandMetadataList(): Promise<HydratedCommandMetadata<C, N, M, I, O>[]>;
    getNamespaceFullName(): Promise<string>;
}
export declare class NamespaceStringHelpFormatter<C extends ICommand<C, N, M, I, O>, N extends INamespace<C, N, M, I, O>, M extends CommandMetadata<I, O>, I extends CommandMetadataInput, O extends CommandMetadataOption> extends NamespaceHelpFormatter<C, N, M, I, O> {
    formatHeader(): Promise<string>;
    formatSummary(): Promise<string>;
    formatDescription(): Promise<string>;
    getGlobalOptions(): Promise<string[]>;
    formatUsage(): Promise<string>;
    formatCommands(): Promise<string>;
    formatCommandGroup(titleText: string, commands: readonly HydratedCommandMetadata<C, N, M, I, O>[]): Promise<string>;
    getListOfCommandDetails(commands: readonly HydratedCommandMetadata<C, N, M, I, O>[]): Promise<string[]>;
    getListOfNamespaceDetails(commands: readonly HydratedCommandMetadata<C, N, M, I, O>[]): Promise<string[]>;
    /**
     * Insert text before the namespace's summary.
     *
     * @param meta: The metadata of the namespace.
     */
    formatBeforeSummary(meta: NamespaceMetadata): Promise<string>;
    /**
     * Insert text after the namespace's summary.
     *
     * @param meta: The metadata of the namespace.
     */
    formatAfterSummary(meta: NamespaceMetadata): Promise<string>;
    /**
     * Insert text that appears before a commands's summary.
     *
     * @param meta: The metadata of the command.
     */
    formatBeforeCommandSummary(meta: HydratedCommandMetadata<C, N, M, I, O>): Promise<string>;
    /**
     * Insert text that appears after a commands's summary.
     *
     * @param meta: The metadata of the command.
     */
    formatAfterCommandSummary(meta: HydratedCommandMetadata<C, N, M, I, O>): Promise<string>;
    /**
     * Insert text that appears before a namespace's summary.
     *
     * @param meta The metadata of the namespace.
     * @param commands An array of the metadata of the namespace's commands.
     */
    formatBeforeNamespaceSummary(meta: HydratedNamespaceMetadata<C, N, M, I, O>, commands: readonly HydratedCommandMetadata<C, N, M, I, O>[]): Promise<string>;
    /**
     * Insert text that appears after a namespace's summary.
     *
     * @param meta The metadata of the namespace.
     * @param commands An array of the metadata of the namespace's commands.
     */
    formatAfterNamespaceSummary(meta: HydratedNamespaceMetadata<C, N, M, I, O>, commands: readonly HydratedCommandMetadata<C, N, M, I, O>[]): Promise<string>;
    format(): Promise<string>;
}
export interface CommandHelpFormatterDeps<C extends ICommand<C, N, M, I, O>, N extends INamespace<C, N, M, I, O>, M extends CommandMetadata<I, O>, I extends CommandMetadataInput, O extends CommandMetadataOption> {
    readonly location: NamespaceLocateResult<C, N, M, I, O>;
    readonly command: C;
    /**
     * Provide extra context with hydrated command metadata. If not provided,
     * `command.getMetadata()` is called.
     */
    readonly metadata?: HydratedCommandMetadata<C, N, M, I, O>;
    readonly colors?: Colors;
}
export declare abstract class CommandHelpFormatter<C extends ICommand<C, N, M, I, O>, N extends INamespace<C, N, M, I, O>, M extends CommandMetadata<I, O>, I extends CommandMetadataInput, O extends CommandMetadataOption> extends HelpFormatter {
    protected readonly location: NamespaceLocateResult<C, N, M, I, O>;
    protected readonly command: C;
    protected readonly dotswidth: number;
    protected _metadata?: M;
    protected _fullName?: string;
    constructor({ location, command, metadata, colors }: CommandHelpFormatterDeps<C, N, M, I, O>);
    protected normalizeMetadata(metadata: M | HydratedCommandMetadata<C, N, M, I, O>): M;
    /**
     * Given an option definition from command metadata, decide whether to keep
     * or discard it.
     *
     * @return `true` to keep, `false` to discard
     */
    filterOptionCallback(option: O): Promise<boolean>;
    getCommandMetadata(): Promise<M | HydratedCommandMetadata<C, N, M, I, O>>;
    getCommandFullName(): Promise<string>;
}
export declare class CommandStringHelpFormatter<C extends ICommand<C, N, M, I, O>, N extends INamespace<C, N, M, I, O>, M extends CommandMetadata<I, O>, I extends CommandMetadataInput, O extends CommandMetadataOption> extends CommandHelpFormatter<C, N, M, I, O> {
    formatHeader(): Promise<string>;
    formatSummary(): Promise<string>;
    formatDescription(): Promise<string>;
    formatInlineInput(input: I): Promise<string>;
    formatUsage(): Promise<string>;
    formatInputs(): Promise<string>;
    formatOptionLine(opt: O): Promise<string>;
    /**
     * Insert text before the command's summary.
     *
     * @param meta The metadata of the command.
     */
    formatBeforeSummary(meta: M): Promise<string>;
    /**
     * Insert text after the command's summary.
     *
     * @param meta The metadata of the command.
     */
    formatAfterSummary(meta: M): Promise<string>;
    /**
     * Insert text that appears before an option's summary.
     *
     * @param opt The metadata of the option.
     */
    formatBeforeOptionSummary(opt: O): Promise<string>;
    formatAfterOptionSummary(opt: O): Promise<string>;
    formatOptionDefault(opt: O): Promise<string>;
    formatOptions(): Promise<string>;
    formatOptionsGroup(titleText: string, options: O[]): Promise<string>;
    formatExamples(): Promise<string>;
    format(): Promise<string>;
}
export interface NamespaceHelpSchema {
    readonly name: string;
    readonly summary: string;
    readonly description: string;
    readonly groups: readonly string[];
    readonly commands: CommandHelpSchema[];
    readonly aliases: readonly string[];
}
export declare class NamespaceSchemaHelpFormatter<C extends ICommand<C, N, M, I, O>, N extends INamespace<C, N, M, I, O>, M extends CommandMetadata<I, O>, I extends CommandMetadataInput, O extends CommandMetadataOption> extends NamespaceHelpFormatter<C, N, M, I, O> {
    format(): Promise<string>;
    serialize(): Promise<NamespaceHelpSchema>;
    formatCommandGroup(commands: readonly HydratedCommandMetadata<C, N, M, I, O>[]): Promise<CommandHelpSchema[]>;
    formatCommand(cmd: HydratedCommandMetadata<C, N, M, I, O>): Promise<CommandHelpSchema>;
}
export interface CommandHelpSchemaInput {
    readonly name: string;
    readonly summary: string;
    readonly required: boolean;
}
export interface CommandHelpSchemaOption {
    readonly name: string;
    readonly summary: string;
    readonly groups: readonly string[];
    readonly aliases: readonly string[];
    readonly type: string;
    readonly default?: string | boolean;
    readonly spec: {
        readonly value: string;
    };
}
export interface CommandHelpSchemaFootnoteText {
    readonly type: 'text';
    readonly id: string | number;
    readonly text: string;
}
export interface CommandHelpSchemaFootnoteLink {
    readonly type: 'link';
    readonly id: string | number;
    readonly url: string;
    readonly shortUrl?: string;
}
export declare type CommandHelpSchemaFootnote = CommandHelpSchemaFootnoteText | CommandHelpSchemaFootnoteLink;
export interface CommandHelpSchema {
    readonly name: string;
    readonly namespace: readonly string[];
    readonly summary: string;
    readonly description: string;
    readonly footnotes: readonly CommandHelpSchemaFootnote[];
    readonly groups: readonly string[];
    readonly exampleCommands: readonly string[];
    readonly aliases: readonly string[];
    readonly inputs: readonly CommandHelpSchemaInput[];
    readonly options: readonly CommandHelpSchemaOption[];
}
export declare class CommandSchemaHelpFormatter<C extends ICommand<C, N, M, I, O>, N extends INamespace<C, N, M, I, O>, M extends CommandMetadata<I, O>, I extends CommandMetadataInput, O extends CommandMetadataOption> extends CommandHelpFormatter<C, N, M, I, O> {
    format(): Promise<string>;
    serialize(): Promise<CommandHelpSchema>;
    formatInputs(inputs: readonly I[]): Promise<readonly CommandHelpSchemaInput[]>;
    formatInput(input: I): Promise<CommandHelpSchemaInput>;
    formatOptions(options: readonly O[]): Promise<readonly CommandHelpSchemaOption[]>;
    formatOption(option: O): Promise<CommandHelpSchemaOption>;
    formatFootnote(footnote: Footnote): CommandHelpSchemaFootnote;
    formatCommand(cmd: M | HydratedCommandMetadata<C, N, M, I, O>): Promise<CommandHelpSchema>;
}
export declare function createCommandMetadataFromSchema(schema: CommandHelpSchema): Required<CommandMetadata>;
