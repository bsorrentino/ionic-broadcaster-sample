import { CommandLineOptions, IConfig, ILogger, IShell, IShellRunOptions } from '../definitions';
export declare const SUPPORTED_PLATFORMS: readonly string[];
export interface NativeRunSchema {
    packagePath: string;
    platform: string;
    forwardedPorts?: (string | number)[];
}
export declare function createNativeRunArgs({ packagePath, platform, forwardedPorts }: NativeRunSchema, options: CommandLineOptions): string[];
export declare function createNativeRunListArgs(inputs: string[], options: CommandLineOptions): string[];
export interface RunNativeRunDeps {
    readonly config: IConfig;
    readonly log: ILogger;
    readonly shell: IShell;
}
export declare function runNativeRun({ config, log, shell }: RunNativeRunDeps, args: readonly string[], options?: IShellRunOptions): Promise<void>;
export interface CheckNativeRunDeps {
    readonly config: IConfig;
}
export declare function checkNativeRun({ config }: CheckNativeRunDeps): Promise<void>;
export declare function findNativeRun(): Promise<string | undefined>;
export interface NativeDeviceTarget {
    platform: string;
    id: string;
    model: string;
    sdkVersion: string;
}
export interface NativeVirtualDeviceTarget {
    platform: string;
    id: string;
    name: string;
    sdkVersion: string;
}
export interface NativeTargetPlatform {
    devices: NativeDeviceTarget[];
    virtualDevices: NativeVirtualDeviceTarget[];
}
export declare function getNativeTargets({ log, shell }: RunNativeRunDeps, platform: string): Promise<NativeTargetPlatform>;
