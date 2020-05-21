import { CommandLineInputs, CommandLineOptions, CommandMetadata } from '../../definitions';
import { SSHBaseCommand } from './base';
export declare class SSHUseCommand extends SSHBaseCommand {
    getMetadata(): Promise<CommandMetadata>;
    run(inputs: CommandLineInputs, options: CommandLineOptions): Promise<void>;
}
