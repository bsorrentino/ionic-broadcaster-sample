import { CommandLineInputs, CommandLineOptions, CommandMetadata, IonicAngularServeOptions, ServeDetails } from '../../../definitions';
import { ServeRunner, ServeRunnerDeps } from '../../serve';
import { IonicAngularProject } from './';
export declare const DEFAULT_SERVE_SCRIPT_VALUE: string;
export interface IonicAngularServeRunnerDeps extends ServeRunnerDeps {
    readonly project: IonicAngularProject;
}
export declare class IonicAngularServeRunner extends ServeRunner<IonicAngularServeOptions> {
    protected readonly e: IonicAngularServeRunnerDeps;
    constructor(e: IonicAngularServeRunnerDeps);
    getCommandMetadata(): Promise<Partial<CommandMetadata>>;
    createOptionsFromCommandLine(inputs: CommandLineInputs, options: CommandLineOptions): IonicAngularServeOptions;
    modifyOpenUrl(url: string, options: IonicAngularServeOptions): string;
    serveProject(options: IonicAngularServeOptions): Promise<ServeDetails>;
    getUsedPorts(options: IonicAngularServeOptions, details: ServeDetails): number[];
}
