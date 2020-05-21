import { CommandLineInputs, CommandLineOptions, CommandMetadata } from '../definitions';
import { Command } from '../lib/command';
export declare class VersionCommand extends Command {
    getMetadata(): Promise<CommandMetadata>;
    run(inputs: CommandLineInputs, options: CommandLineOptions): Promise<void>;
}
