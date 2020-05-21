import { CommandLineInputs, CommandLineOptions, CommandMetadata } from '../../definitions';
import { BaseConfigCommand } from './base';
export declare class ConfigSetCommand extends BaseConfigCommand {
    getMetadata(): Promise<CommandMetadata>;
    run(inputs: CommandLineInputs, options: CommandLineOptions): Promise<void>;
}
