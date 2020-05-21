import { CommandLineInputs, CommandLineOptions, CommandMetadata } from '../definitions';
import { Command } from '../lib/command';
export declare class InitCommand extends Command {
    getMetadata(): Promise<CommandMetadata>;
    preRun(inputs: CommandLineInputs, options: CommandLineOptions): Promise<void>;
    run(inputs: CommandLineInputs, options: CommandLineOptions): Promise<void>;
    initializeMultiProject(inputs: CommandLineInputs, options: CommandLineOptions): Promise<void>;
    initializeApp(inputs: CommandLineInputs, options: CommandLineOptions): Promise<void>;
    getProjectFilePath(): string;
}
