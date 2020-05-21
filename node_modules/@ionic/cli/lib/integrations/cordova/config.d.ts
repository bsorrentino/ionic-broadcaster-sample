import * as et from 'elementtree';
import { CordovaPackageJson, ProjectIntegration } from '../../../definitions';
export interface ConfiguredPlatform {
    name: string;
    spec?: string;
}
export declare class CordovaConfig {
    readonly configXmlPath: string;
    readonly packageJsonPath: string;
    protected _doc?: et.ElementTree;
    protected _pkg?: CordovaPackageJson;
    protected _sessionid?: string;
    protected saving: boolean;
    constructor(configXmlPath: string, packageJsonPath: string);
    get doc(): et.ElementTree;
    get pkg(): CordovaPackageJson;
    get sessionid(): string;
    static load(configXmlPath: string, packageJsonPath: string): Promise<CordovaConfig>;
    protected reload(): Promise<void>;
    save(): Promise<void>;
    setName(name: string): void;
    setBundleId(bundleId: string): void;
    getBundleId(): string | undefined;
    /**
     * Update config.xml content src to be a dev server url. As part of this
     * backup the original content src for a reset to occur at a later time.
     */
    writeContentSrc(newSrc: string): void;
    /**
     * Set config.xml src url back to its original url
     */
    resetContentSrc(): void;
    getPreference(prefName: string): string | undefined;
    getProjectInfo(): {
        id: string;
        name: string;
        version: string;
    };
    getConfiguredPlatforms(): ConfiguredPlatform[];
    protected write(): string;
}
export declare function loadCordovaConfig(integration: Required<ProjectIntegration>): Promise<CordovaConfig>;
