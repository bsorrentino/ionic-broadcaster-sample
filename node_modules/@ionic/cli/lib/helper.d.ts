import { IConfig, IPCMessage, IonicContext } from '../definitions';
export interface SendMessageDeps {
    config: IConfig;
    ctx: IonicContext;
}
export declare function sendMessage({ config, ctx }: SendMessageDeps, msg: IPCMessage): Promise<void>;
