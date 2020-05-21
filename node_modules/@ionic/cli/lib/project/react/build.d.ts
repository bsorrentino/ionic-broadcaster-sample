/// <reference types="node" />
import { CommandLineInputs, CommandLineOptions, CommandMetadata, ReactBuildOptions } from '../../../definitions';
import { BuildCLI, BuildRunner, BuildRunnerDeps } from '../../build';
import { ReactProject } from './';
export interface ReactBuildRunnerDeps extends BuildRunnerDeps {
    readonly project: ReactProject;
}
export declare class ReactBuildRunner extends BuildRunner<ReactBuildOptions> {
    protected readonly e: ReactBuildRunnerDeps;
    constructor(e: ReactBuildRunnerDeps);
    getCommandMetadata(): Promise<Partial<CommandMetadata>>;
    createOptionsFromCommandLine(inputs: CommandLineInputs, options: CommandLineOptions): ReactBuildOptions;
    buildProject(options: ReactBuildOptions): Promise<void>;
}
export declare class ReactBuildCLI extends BuildCLI<ReactBuildOptions> {
    readonly name = "React Scripts";
    readonly pkg = "react-scripts";
    readonly program = "react-scripts";
    readonly prefix = "react-scripts";
    readonly script = "ionic:build";
    protected buildArgs(options: ReactBuildOptions): Promise<string[]>;
    protected buildEnvVars(options: ReactBuildOptions): Promise<NodeJS.ProcessEnv>;
}
