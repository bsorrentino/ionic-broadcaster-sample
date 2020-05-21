import { CommandInstanceInfo, CommandLineInputs, CommandLineOptions, CommandMetadata } from '../../definitions';
import { SSHBaseCommand } from './base';
export declare class SSHSetupCommand extends SSHBaseCommand {
    getMetadata(): Promise<CommandMetadata>;
    preRun(): Promise<void>;
    run(inputs: CommandLineInputs, options: CommandLineOptions, runinfo: CommandInstanceInfo): Promise<void>;
}
