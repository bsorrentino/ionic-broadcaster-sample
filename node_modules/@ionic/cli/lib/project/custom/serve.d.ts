import { CommandMetadata, CustomServeOptions, ServeDetails } from '../../../definitions';
import { ServeRunner, ServeRunnerDeps } from '../../serve';
export declare class CustomServeRunner extends ServeRunner<CustomServeOptions> {
    protected readonly e: ServeRunnerDeps;
    constructor(e: ServeRunnerDeps);
    getCommandMetadata(): Promise<Partial<CommandMetadata>>;
    modifyOpenUrl(url: string, options: CustomServeOptions): string;
    serveProject(options: CustomServeOptions): Promise<ServeDetails>;
}
