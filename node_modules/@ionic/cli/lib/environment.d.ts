import { PromptModule } from '@ionic/cli-framework-prompts';
import { IClient, IConfig, ILogger, ISession, IShell, InfoItem, IonicContext, IonicEnvironment, IonicEnvironmentFlags } from '../definitions';
export interface EnvironmentDeps {
    readonly client: IClient;
    readonly config: IConfig;
    readonly flags: IonicEnvironmentFlags;
    readonly getInfo: () => Promise<InfoItem[]>;
    readonly log: ILogger;
    readonly ctx: IonicContext;
    readonly prompt: PromptModule;
    readonly session: ISession;
    readonly shell: IShell;
}
export declare class Environment implements IonicEnvironment {
    readonly flags: IonicEnvironmentFlags;
    readonly client: IClient;
    readonly config: IConfig;
    getInfo: () => Promise<InfoItem[]>;
    readonly log: ILogger;
    readonly prompt: PromptModule;
    session: ISession;
    readonly shell: IShell;
    readonly ctx: IonicContext;
    constructor({ client, config, flags, getInfo, log, ctx, prompt, session, shell }: EnvironmentDeps);
}
