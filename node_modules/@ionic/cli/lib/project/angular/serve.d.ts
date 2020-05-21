import { AngularServeOptions, CommandLineInputs, CommandLineOptions, CommandMetadata, ServeDetails } from '../../../definitions';
import { ServeCLI, ServeRunner, ServeRunnerDeps } from '../../serve';
import { AngularProject } from './';
export interface AngularServeRunnerDeps extends ServeRunnerDeps {
    readonly project: AngularProject;
}
export declare class AngularServeRunner extends ServeRunner<AngularServeOptions> {
    protected readonly e: AngularServeRunnerDeps;
    constructor(e: AngularServeRunnerDeps);
    getCommandMetadata(): Promise<Partial<CommandMetadata>>;
    createOptionsFromCommandLine(inputs: CommandLineInputs, options: CommandLineOptions): AngularServeOptions;
    platformToMode(platform: string): string;
    modifyOpenUrl(url: string, options: AngularServeOptions): string;
    serveProject(options: AngularServeOptions): Promise<ServeDetails>;
    getUsedPorts(options: AngularServeOptions, details: ServeDetails): number[];
}
export declare class AngularServeCLI extends ServeCLI<AngularServeOptions> {
    readonly name = "Angular CLI";
    readonly pkg = "@angular/cli";
    readonly program = "ng";
    readonly prefix = "ng";
    readonly script = "ionic:serve";
    protected chunks: number;
    serve(options: AngularServeOptions): Promise<void>;
    protected stdoutFilter(line: string): boolean;
    protected buildArgs(options: AngularServeOptions): Promise<string[]>;
    protected serveOptionsToNgArgs(options: AngularServeOptions): Promise<string[]>;
    protected buildArchitectCommand(options: AngularServeOptions): string[];
}
