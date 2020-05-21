import { CommandInstanceInfo, CommandLineInputs, CommandLineOptions, CommandMetadata, IProject, ProjectIntegration } from '../definitions';
import { Command } from '../lib/command';
export declare class RepairCommand extends Command {
    getMetadata(): Promise<CommandMetadata>;
    run(inputs: CommandLineInputs, options: CommandLineOptions, runinfo: CommandInstanceInfo): Promise<void>;
    npmRepair(project: IProject): Promise<void>;
    cordovaRepair(cordova: Required<ProjectIntegration>, runinfo: CommandInstanceInfo): Promise<void>;
}
