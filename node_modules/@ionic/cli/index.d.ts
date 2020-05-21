import { IPCMessage, IonicContext } from './definitions';
import { Executor } from './lib/executor';
export * from './constants';
export * from './guards';
export * from './definitions';
export declare function generateContext(): Promise<IonicContext>;
export declare function loadExecutor(ctx: IonicContext, pargv: string[]): Promise<Executor>;
export declare function run(pargv: string[]): Promise<void>;
export declare function receive(msg: IPCMessage): Promise<void>;
