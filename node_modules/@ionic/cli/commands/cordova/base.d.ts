import { CommandInstanceInfo, CommandMetadataOption, IShellRunOptions, ProjectIntegration } from '../../definitions';
import { Command } from '../../lib/command';
export declare const CORDOVA_COMPILE_OPTIONS: CommandMetadataOption[];
export declare const CORDOVA_RUN_OPTIONS: readonly CommandMetadataOption[];
export declare const CORDOVA_BUILD_EXAMPLE_COMMANDS: string[];
export declare abstract class CordovaCommand extends Command {
    private _integration?;
    protected get integration(): Required<ProjectIntegration>;
    protected checkCordova(runinfo: CommandInstanceInfo): Promise<void>;
    protected preRunChecks(runinfo: CommandInstanceInfo): Promise<void>;
    protected runCordova(argList: string[], { fatalOnNotFound, truncateErrorOutput, ...options }?: IShellRunOptions): Promise<void>;
    protected checkForPlatformInstallation(platform: string, { promptToInstall, promptToInstallRefusalMsg }?: {
        promptToInstall?: boolean;
        promptToInstallRefusalMsg?: string;
    }): Promise<void>;
}
