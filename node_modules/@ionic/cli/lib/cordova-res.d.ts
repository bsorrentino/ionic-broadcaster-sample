import { CommandLineOptions, IConfig, ILogger, IShell, IShellRunOptions, NpmClient } from '../definitions';
import { FatalException } from './errors';
export declare const SUPPORTED_PLATFORMS: readonly string[];
export interface CordovaResSchema {
    platform?: string;
}
export declare function createCordovaResArgs({ platform }: CordovaResSchema, options: CommandLineOptions): string[];
export interface RunCordovaResDeps {
    readonly config: IConfig;
    readonly log: ILogger;
    readonly shell: IShell;
}
export declare function runCordovaRes({ config, log, shell }: RunCordovaResDeps, args: readonly string[], options?: IShellRunOptions): Promise<void>;
export interface CheckCordovaResDeps {
    readonly config: IConfig;
}
export declare function checkCordovaRes({ config }: CheckCordovaResDeps): Promise<void>;
export declare function findCordovaRes(): Promise<string | undefined>;
export declare function createCordovaResNotFoundError(npmClient: NpmClient): Promise<FatalException>;
export declare function createCordovaResNotFoundMessage(npmClient: NpmClient): Promise<string>;
