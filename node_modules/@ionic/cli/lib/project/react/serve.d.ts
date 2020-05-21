/// <reference types="node" />
import { CommandLineInputs, CommandLineOptions } from '@ionic/cli-framework';
import { CommandMetadata, ReactServeOptions, ServeDetails } from '../../../definitions';
import { ServeCLI, ServeRunner, ServeRunnerDeps } from '../../serve';
export declare class ReactServeRunner extends ServeRunner<ReactServeOptions> {
    protected readonly e: ServeRunnerDeps;
    constructor(e: ServeRunnerDeps);
    getCommandMetadata(): Promise<Partial<CommandMetadata>>;
    createOptionsFromCommandLine(inputs: CommandLineInputs, options: CommandLineOptions): ReactServeOptions;
    modifyOpenUrl(url: string, options: ReactServeOptions): string;
    serveProject(options: ReactServeOptions): Promise<ServeDetails>;
}
export declare class ReactServeCLI extends ServeCLI<ReactServeOptions> {
    readonly name = "React Scripts";
    readonly pkg = "react-scripts";
    readonly program = "react-scripts";
    readonly prefix = "react-scripts";
    readonly script = "ionic:serve";
    protected chunks: number;
    serve(options: ReactServeOptions): Promise<void>;
    protected stdoutFilter(line: string): boolean;
    protected buildArgs(options: ReactServeOptions): Promise<string[]>;
    protected buildEnvVars(options: ReactServeOptions): Promise<NodeJS.ProcessEnv>;
}
