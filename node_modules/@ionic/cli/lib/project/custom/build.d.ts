import { CommandLineInputs, CommandLineOptions, CommandMetadata, CustomBuildOptions } from '../../../definitions';
import { BuildRunner, BuildRunnerDeps } from '../../build';
export declare class CustomBuildRunner extends BuildRunner<CustomBuildOptions> {
    protected readonly e: BuildRunnerDeps;
    constructor(e: BuildRunnerDeps);
    getCommandMetadata(): Promise<Partial<CommandMetadata>>;
    createOptionsFromCommandLine(inputs: CommandLineInputs, options: CommandLineOptions): CustomBuildOptions;
    buildProject(options: CustomBuildOptions): Promise<void>;
}
