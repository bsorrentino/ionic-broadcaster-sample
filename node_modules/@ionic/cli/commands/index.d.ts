import { IProject, IonicEnvironment } from '../definitions';
import { CommandMap, Namespace, NamespaceMap } from '../lib/namespace';
export interface IonicEnvironmentDeps {
    readonly env: IonicEnvironment;
    readonly project?: IProject;
}
export declare class IonicNamespace extends Namespace {
    protected _env: IonicEnvironment;
    protected _project: IProject | undefined;
    constructor({ env, project }: IonicEnvironmentDeps);
    get project(): IProject | undefined;
    set project(p: IProject | undefined);
    get env(): IonicEnvironment;
    set env(env: IonicEnvironment);
    getMetadata(): Promise<{
        name: string;
        summary: string;
    }>;
    getNamespaces(): Promise<NamespaceMap>;
    getCommands(): Promise<CommandMap>;
}
