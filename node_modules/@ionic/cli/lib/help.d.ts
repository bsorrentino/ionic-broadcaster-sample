import { CommandHelpFormatterDeps as BaseCommandHelpFormatterDeps, CommandHelpSchema as BaseCommandHelpSchema, CommandSchemaHelpFormatter as BaseCommandSchemaHelpFormatter, CommandStringHelpFormatter as BaseCommandStringHelpFormatter, NamespaceHelpFormatterDeps as BaseNamespaceHelpFormatterDeps, NamespaceSchemaHelpFormatter as BaseNamespaceSchemaHelpFormatter, NamespaceStringHelpFormatter as BaseNamespaceStringHelpFormatter } from '@ionic/cli-framework';
import { CommandMetadata, CommandMetadataInput, CommandMetadataOption, HydratedCommandMetadata, ICommand, INamespace } from '../definitions';
export interface NamespaceHelpFormatterDeps extends BaseNamespaceHelpFormatterDeps<ICommand, INamespace, CommandMetadata, CommandMetadataInput, CommandMetadataOption> {
    readonly inProject: boolean;
    readonly version: string;
}
export interface CommandHelpFormatterDeps extends BaseCommandHelpFormatterDeps<ICommand, INamespace, CommandMetadata, CommandMetadataInput, CommandMetadataOption> {
}
export declare class NamespaceStringHelpFormatter extends BaseNamespaceStringHelpFormatter<ICommand, INamespace, CommandMetadata, CommandMetadataInput, CommandMetadataOption> {
    protected readonly inProject: boolean;
    protected readonly version: string;
    constructor({ version, inProject, ...rest }: NamespaceHelpFormatterDeps);
    formatHeader(): Promise<string>;
    formatIonicHeader(): Promise<string>;
    getGlobalOptions(): Promise<string[]>;
    formatCommands(): Promise<string>;
}
export declare class CommandStringHelpFormatter extends BaseCommandStringHelpFormatter<ICommand, INamespace, CommandMetadata, CommandMetadataInput, CommandMetadataOption> {
    constructor(options: CommandHelpFormatterDeps);
    formatOptions(): Promise<string>;
    formatBeforeOptionSummary(opt: CommandMetadataOption): Promise<string>;
}
export declare class NamespaceSchemaHelpFormatter extends BaseNamespaceSchemaHelpFormatter<ICommand, INamespace, CommandMetadata, CommandMetadataInput, CommandMetadataOption> {
    formatCommand(cmd: HydratedCommandMetadata): Promise<CommandHelpSchema>;
}
export interface CommandHelpSchema extends BaseCommandHelpSchema {
    type: string;
}
export declare class CommandSchemaHelpFormatter extends BaseCommandSchemaHelpFormatter<ICommand, INamespace, CommandMetadata, CommandMetadataInput, CommandMetadataOption> {
    formatCommand(cmd: CommandMetadata | HydratedCommandMetadata): Promise<CommandHelpSchema>;
}
