import { CommandLineInputs, CommandLineOptions, IConfig, IProject } from '../../definitions';
import { Command } from '../../lib/command';
export interface BaseConfigContext {
    json: boolean;
    force: boolean;
    root: boolean;
    property?: string;
    value?: any;
}
export interface GlobalConfigContext extends BaseConfigContext {
    global: true;
    config: IConfig;
}
export interface ProjectConfigContext extends BaseConfigContext {
    global: false;
    config: IProject['config'];
}
export declare type ConfigContext = GlobalConfigContext | ProjectConfigContext;
export declare abstract class BaseConfigCommand extends Command {
    generateContext(inputs: CommandLineInputs, options: CommandLineOptions): ConfigContext;
    jsonStringify(v: any): string;
    interpretValue(v?: string, expectJson?: boolean): any;
}
interface FlexibleConfigFile {
    [key: string]: any;
}
export declare function getConfig(ctx: ConfigContext): FlexibleConfigFile;
export declare function getConfigValue(ctx: ConfigContext): any;
export declare function setConfigValue(ctx: ConfigContext & {
    property: string;
    originalValue: any;
}): void;
export declare function unsetConfigValue(ctx: ConfigContext & {
    property: string;
}): void;
export {};
