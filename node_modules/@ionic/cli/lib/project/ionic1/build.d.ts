import { CommandLineInputs, CommandLineOptions, CommandMetadata, Ionic1BuildOptions } from '../../../definitions';
import { BuildRunner, BuildRunnerDeps } from '../../build';
import { Ionic1Project } from './';
export interface Ionic1BuildRunnerDeps extends BuildRunnerDeps {
    readonly project: Ionic1Project;
}
export declare class Ionic1BuildRunner extends BuildRunner<Ionic1BuildOptions> {
    protected readonly e: Ionic1BuildRunnerDeps;
    constructor(e: Ionic1BuildRunnerDeps);
    getCommandMetadata(): Promise<Partial<CommandMetadata>>;
    createOptionsFromCommandLine(inputs: CommandLineInputs, options: CommandLineOptions): Ionic1BuildOptions;
    buildProject(options: Ionic1BuildOptions): Promise<void>;
}
