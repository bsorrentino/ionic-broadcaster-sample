import { BaseIntegration, IntegrationConfig } from '../';
import { InfoItem, IntegrationAddDetails, IntegrationName, ProjectIntegration, ProjectPersonalizationDetails } from '../../../definitions';
import * as configlib from './config';
export declare class Integration extends BaseIntegration<ProjectIntegration> {
    readonly name: IntegrationName;
    readonly summary = "Target native iOS and Android with Apache Cordova";
    readonly archiveUrl = "https://d2ql0qc7j8u4b2.cloudfront.net/integration-cordova.tar.gz";
    get config(): IntegrationConfig;
    add(details: IntegrationAddDetails): Promise<void>;
    getCordovaConfig(): Promise<configlib.CordovaConfig | undefined>;
    requireConfig(): Promise<configlib.CordovaConfig>;
    getInfo(): Promise<InfoItem[]>;
    personalize({ name, packageId }: ProjectPersonalizationDetails): Promise<void>;
    getCordovaVersion(): Promise<string | undefined>;
    getCordovaPlatformVersions(): Promise<string>;
    getCordovaPluginVersions(): Promise<string>;
    getXcodebuildVersion(): Promise<string | undefined>;
    getIOSDeployVersion(): Promise<string | undefined>;
    getIOSSimVersion(): Promise<string | undefined>;
}
