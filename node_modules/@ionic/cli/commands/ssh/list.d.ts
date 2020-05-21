import { CommandLineInputs, CommandLineOptions, CommandMetadata, CommandPreRun } from '../../definitions';
import { SSHBaseCommand } from './base';
export declare class SSHListCommand extends SSHBaseCommand implements CommandPreRun {
    getMetadata(): Promise<CommandMetadata>;
    preRun(): Promise<void>;
    run(inputs: CommandLineInputs, options: CommandLineOptions): Promise<void>;
}
