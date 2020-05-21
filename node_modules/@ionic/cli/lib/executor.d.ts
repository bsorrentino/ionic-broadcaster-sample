import { BaseExecutor } from '@ionic/cli-framework';
import { CommandInstanceInfo, CommandMetadata, CommandMetadataInput, CommandMetadataOption, ICommand, INamespace, NamespaceLocateResult } from '../definitions';
export declare const VERSION_FLAGS: readonly string[];
export declare const HELP_FLAGS: readonly string[];
export interface ExecutorDeps {
    readonly namespace: INamespace;
}
export declare class Executor extends BaseExecutor<ICommand, INamespace, CommandMetadata, CommandMetadataInput, CommandMetadataOption> {
    locate(argv: readonly string[]): Promise<NamespaceLocateResult>;
    run(command: ICommand, cmdargs: string[], { location, env, executor }: CommandInstanceInfo): Promise<void>;
}
export declare function runCommand(runinfo: CommandInstanceInfo, argv: string[]): Promise<void>;
export declare function metadataToCmdOptsEnv(metadata: CommandMetadata, cmdNameParts: string[]): Map<CommandMetadataOption, string>;
export declare function getFullCommandParts(location: NamespaceLocateResult): string[];
