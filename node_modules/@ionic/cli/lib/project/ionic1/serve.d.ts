import { CommandLineInputs, CommandLineOptions, CommandMetadata, Ionic1ServeOptions, ServeDetails } from '../../../definitions';
import { ServeRunner, ServeRunnerDeps } from '../../serve';
import { Ionic1Project } from './';
export interface Ionic1ServeRunnerDeps extends ServeRunnerDeps {
    readonly project: Ionic1Project;
}
export declare class Ionic1ServeRunner extends ServeRunner<Ionic1ServeOptions> {
    protected readonly e: Ionic1ServeRunnerDeps;
    constructor(e: Ionic1ServeRunnerDeps);
    getCommandMetadata(): Promise<Partial<CommandMetadata>>;
    createOptionsFromCommandLine(inputs: CommandLineInputs, options: CommandLineOptions): Ionic1ServeOptions;
    modifyOpenUrl(url: string, options: Ionic1ServeOptions): string;
    serveProject(options: Ionic1ServeOptions): Promise<ServeDetails>;
    getUsedPorts(options: Ionic1ServeOptions, details: ServeDetails): number[];
}
