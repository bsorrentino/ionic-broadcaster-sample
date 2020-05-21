import { PackageJson } from '@ionic/cli-framework';
import * as Debug from 'debug';
import { IAilment, IAilmentRegistry, IClient, IConfig, ILogger, IProject, ISession, IShell, PatientTreatmentStep, ProjectType } from '../../../definitions';
export interface AilmentDeps {
    client: IClient;
    config: IConfig;
    log: ILogger;
    project: IProject;
    shell: IShell;
    session: ISession;
}
export declare abstract class Ailment implements IAilment {
    protected readonly client: IClient;
    protected readonly config: IConfig;
    protected readonly log: ILogger;
    protected readonly project: IProject;
    protected readonly shell: IShell;
    protected readonly session: ISession;
    private _debug?;
    abstract readonly id: string;
    readonly projects?: ProjectType[];
    readonly implicit: boolean;
    constructor({ client, config, log, project, shell, session }: AilmentDeps);
    get debug(): Debug.Debugger;
    abstract getMessage(): Promise<string>;
    abstract detected(): Promise<boolean>;
    abstract getTreatmentSteps(): Promise<PatientTreatmentStep[]>;
    getLocalPackageJson(pkgName: string): Promise<PackageJson | undefined>;
}
export declare class AilmentRegistry implements IAilmentRegistry {
    protected _ailments: IAilment[];
    register(ailment: IAilment): void;
    get ailments(): IAilment[];
    get(id: string): IAilment | undefined;
}
