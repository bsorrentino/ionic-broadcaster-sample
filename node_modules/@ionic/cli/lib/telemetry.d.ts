import { IClient, IConfig, IProject, ISession, ITelemetry, InfoItem, IonicContext } from '../definitions';
export interface TelemetryDeps {
    readonly client: IClient;
    readonly config: IConfig;
    readonly getInfo: () => Promise<InfoItem[]>;
    readonly ctx: IonicContext;
    readonly project?: IProject;
    readonly session: ISession;
}
export declare class Telemetry implements ITelemetry {
    protected readonly client: IClient;
    protected readonly config: IConfig;
    protected readonly getInfo: () => Promise<InfoItem[]>;
    protected readonly ctx: IonicContext;
    protected readonly project?: IProject;
    protected readonly session: ISession;
    constructor({ config, client, getInfo, ctx, project, session }: TelemetryDeps);
    sendCommand(command: string, args: string[]): Promise<void>;
}
export declare function sendCommand({ config, client, getInfo, ctx, session, project }: TelemetryDeps, command: string, args: string[]): Promise<void>;
