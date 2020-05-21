import { CommandLineInputs, CommandLineOptions, CommandMetadata, IonicAngularBuildOptions } from '../../../definitions';
import { BuildCLI, BuildRunner, BuildRunnerDeps } from '../../build';
import { IonicAngularProject } from './';
export declare const DEFAULT_PROGRAM = "ionic-app-scripts";
export declare const DEFAULT_BUILD_SCRIPT_VALUE: string;
export interface IonicAngularBuildRunnerDeps extends BuildRunnerDeps {
    readonly project: IonicAngularProject;
}
export declare class IonicAngularBuildRunner extends BuildRunner<IonicAngularBuildOptions> {
    protected readonly e: IonicAngularBuildRunnerDeps;
    constructor(e: IonicAngularBuildRunnerDeps);
    getCommandMetadata(): Promise<Partial<CommandMetadata>>;
    createOptionsFromCommandLine(inputs: CommandLineInputs, options: CommandLineOptions): IonicAngularBuildOptions;
    buildProject(options: IonicAngularBuildOptions): Promise<void>;
}
export declare class IonicAngularBuildCLI extends BuildCLI<IonicAngularBuildOptions> {
    readonly name = "Ionic App Scripts";
    readonly pkg = "@ionic/app-scripts";
    readonly program = "ionic-app-scripts";
    readonly prefix = "app-scripts";
    readonly script?: string;
    protected buildOptionsToAppScriptsArgs(options: IonicAngularBuildOptions): string[];
    protected buildArgs(options: IonicAngularBuildOptions): Promise<string[]>;
    protected resolveProgram(): Promise<string>;
}
