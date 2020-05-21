import { CommandInstanceInfo, CommandLineInputs, CommandLineOptions, CommandMetadata } from '../../definitions';
import { Command } from '../../lib/command';
export declare class RegisterCommand extends Command {
    getMetadata(): Promise<CommandMetadata>;
    run(inputs: CommandLineInputs, options: CommandLineOptions, runinfo: CommandInstanceInfo): Promise<void>;
}
