import { CommandInstanceInfo, CommandLineInputs, CommandLineOptions, CommandMetadata, CommandPreRun } from '../../definitions';
import { CordovaCommand } from './base';
export declare class CompileCommand extends CordovaCommand implements CommandPreRun {
    getMetadata(): Promise<CommandMetadata>;
    preRun(inputs: CommandLineInputs, options: CommandLineOptions, runinfo: CommandInstanceInfo): Promise<void>;
    run(inputs: CommandLineInputs, options: CommandLineOptions): Promise<void>;
}
