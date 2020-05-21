import { CommandLineInputs, CommandLineOptions, CommandMetadata } from '../../definitions';
import { CordovaCommand } from './base';
export declare class ResourcesCommand extends CordovaCommand {
    getMetadata(): Promise<CommandMetadata>;
    run(inputs: CommandLineInputs, options: CommandLineOptions): Promise<void>;
}
