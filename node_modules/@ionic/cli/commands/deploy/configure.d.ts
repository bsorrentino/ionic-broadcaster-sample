import { CommandLineInputs, CommandLineOptions } from '@ionic/cli-framework';
import { CommandInstanceInfo, CommandMetadata } from '../../definitions';
import { DeployConfCommand } from './core';
export declare class ConfigureCommand extends DeployConfCommand {
    getMetadata(): Promise<CommandMetadata>;
    preRun(inputs: CommandLineInputs, options: CommandLineOptions): Promise<void>;
    run(inputs: CommandLineInputs, options: CommandLineOptions, runinfo: CommandInstanceInfo): Promise<void>;
}
