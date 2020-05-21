import { CommandLineInputs, CommandLineOptions, CommandMetadata } from '../../definitions';
import { BaseConfigCommand, ConfigContext } from './base';
export declare class ConfigGetCommand extends BaseConfigCommand {
    getMetadata(): Promise<CommandMetadata>;
    run(inputs: CommandLineInputs, options: CommandLineOptions): Promise<void>;
    printConfig(ctx: ConfigContext, v: any): void;
    sanitizeEntry(key: string, value: any): typeof value;
}
