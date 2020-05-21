import { CommandInstanceInfo, CommandLineInputs, CommandLineOptions, CommandMetadata, CommandPreRun } from '../../definitions';
import { CordovaCommand } from './base';
export declare class RunCommand extends CordovaCommand implements CommandPreRun {
    getMetadata(): Promise<CommandMetadata>;
    preRun(inputs: CommandLineInputs, options: CommandLineOptions, runinfo: CommandInstanceInfo): Promise<void>;
    run(inputs: CommandLineInputs, options: CommandLineOptions): Promise<void>;
    protected runServeDeploy(inputs: CommandLineInputs, options: CommandLineOptions): Promise<void>;
    protected runBuildDeploy(inputs: CommandLineInputs, options: CommandLineOptions): Promise<void>;
    protected checkNativeRun(): Promise<void>;
    protected runNativeRun(args: readonly string[]): Promise<void>;
}
