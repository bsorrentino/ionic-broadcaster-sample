import { CommandInstanceInfo, CommandLineInputs, CommandLineOptions, CommandMetadata, CommandPreRun } from '../definitions';
import { Command } from '../lib/command';
export declare class ServeCommand extends Command implements CommandPreRun {
    getMetadata(): Promise<CommandMetadata>;
    preRun(inputs: CommandLineInputs, options: CommandLineOptions, { location }: CommandInstanceInfo): Promise<void>;
    run(inputs: CommandLineInputs, options: CommandLineOptions, runinfo: CommandInstanceInfo): Promise<void>;
}
export declare class LabCommand extends ServeCommand {
    getMetadata(): Promise<CommandMetadata>;
}
