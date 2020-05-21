import { AngularBuildOptions, CommandLineInputs, CommandLineOptions, CommandMetadata } from '../../../definitions';
import { BuildCLI, BuildRunner, BuildRunnerDeps } from '../../build';
import { AngularProject } from './';
export interface AngularBuildRunnerDeps extends BuildRunnerDeps {
    readonly project: AngularProject;
}
export declare class AngularBuildRunner extends BuildRunner<AngularBuildOptions> {
    protected readonly e: AngularBuildRunnerDeps;
    constructor(e: AngularBuildRunnerDeps);
    getCommandMetadata(): Promise<Partial<CommandMetadata>>;
    createOptionsFromCommandLine(inputs: CommandLineInputs, options: CommandLineOptions): AngularBuildOptions;
    buildProject(options: AngularBuildOptions): Promise<void>;
}
export declare class AngularBuildCLI extends BuildCLI<AngularBuildOptions> {
    readonly name = "Angular CLI";
    readonly pkg = "@angular/cli";
    readonly program = "ng";
    readonly prefix = "ng";
    readonly script = "ionic:build";
    protected buildArgs(options: AngularBuildOptions): Promise<string[]>;
    protected buildOptionsToNgArgs(options: AngularBuildOptions): Promise<string[]>;
    protected buildArchitectCommand(options: AngularBuildOptions): string[];
}
