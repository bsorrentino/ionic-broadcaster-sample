import { PackageJson } from '@ionic/cli-framework';
import { IConfig, IonicEnvironment } from '../definitions';
export interface PersistedPackage {
    name: string;
    version: string;
}
export interface UpdateConfig {
    lastUpdate?: string;
    lastNotify?: string;
    packages: PersistedPackage[];
}
export declare function readUpdateConfig(dir: string): Promise<UpdateConfig>;
export declare function writeUpdateConfig(dir: string, config: UpdateConfig): Promise<void>;
export interface GetUpdateConfigDeps {
    readonly config: IConfig;
}
export declare function getUpdateConfig({ config }: GetUpdateConfigDeps): Promise<UpdateConfig>;
export interface PersistPackageVersionsDeps {
    readonly config: IConfig;
}
export declare function runUpdateCheck({ config }: PersistPackageVersionsDeps): Promise<void>;
export declare function runNotify(env: IonicEnvironment, pkg: PersistedPackage, latestVersion: string): Promise<void>;
export declare function runUpdateNotify(env: IonicEnvironment, pkg: PackageJson): Promise<void>;
