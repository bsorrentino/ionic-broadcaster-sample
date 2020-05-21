/// <reference types="node" />
import { CommandLineOptions, IConfig, ILogger, ProjectType, StarterList, StarterManifest, StarterTemplate } from '../definitions';
export declare const STARTER_BASE_URL = "https://d2ql0qc7j8u4b2.cloudfront.net";
export interface BaseAppSchema {
    projectId: string;
    projectDir: string;
    packageId?: string;
    appflowId?: string;
}
export interface NewAppSchema extends BaseAppSchema {
    cloned: false;
    name: string;
    type: ProjectType;
    template: string;
    themeColor?: string;
    appIcon?: Buffer;
    splash?: Buffer;
}
export interface ClonedAppSchema extends BaseAppSchema {
    cloned: true;
    url: string;
}
export declare type AppSchema = NewAppSchema | ClonedAppSchema;
export declare function verifyOptions(options: CommandLineOptions, { log }: {
    log: ILogger;
}): void;
export declare function readStarterManifest(p: string): Promise<StarterManifest>;
export declare function getAdvertisement(): string;
export declare function getStarterList(config: IConfig, tag?: string): Promise<StarterList>;
export declare function getStarterProjectTypes(): string[];
export interface SupportedFramework {
    name: string;
    type: ProjectType;
    description: string;
}
export declare const SUPPORTED_FRAMEWORKS: readonly SupportedFramework[];
export declare const STARTER_TEMPLATES: StarterTemplate[];
