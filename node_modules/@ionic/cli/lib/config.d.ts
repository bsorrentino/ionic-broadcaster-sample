import { BaseConfig, BaseConfigOptions, ParsedArgs } from '@ionic/cli-framework';
import { CommandMetadataOption, ConfigFile, CreateRequestOptions, IConfig } from '../definitions';
export declare const GLOBAL_OPTIONS: readonly CommandMetadataOption[];
export declare const CONFIG_FILE = "config.json";
export declare const DEFAULT_CONFIG_DIRECTORY: string;
export declare class Config extends BaseConfig<ConfigFile> implements IConfig {
    constructor(p: string, options?: BaseConfigOptions);
    provideDefaults(config: Partial<ConfigFile>): ConfigFile;
    getAPIUrl(): string;
    getDashUrl(): string;
    getGitHost(): string;
    getGitPort(): number;
    getHTTPConfig(): CreateRequestOptions;
}
export declare function parseGlobalOptions(pargv: string[]): ParsedArgs;
