import { Project } from '../';
import { InfoItem } from '../../../definitions';
export declare const ERROR_INVALID_BOWER_JSON = "INVALID_BOWER_JSON";
export interface BowerJson {
    name: string;
    dependencies?: {
        [key: string]: string | undefined;
    };
    devDependencies?: {
        [key: string]: string | undefined;
    };
}
export declare class Ionic1Project extends Project {
    readonly type: 'ionic1';
    protected bowerJsonFile?: BowerJson;
    getInfo(): Promise<InfoItem[]>;
    detected(): Promise<boolean>;
    getSourceDir(): Promise<string>;
    getDocsUrl(): Promise<string>;
    getFrameworkVersion(): Promise<string | undefined>;
    loadBowerJson(): Promise<BowerJson>;
    requireBuildRunner(): Promise<import('./build').Ionic1BuildRunner>;
    requireServeRunner(): Promise<import('./serve').Ionic1ServeRunner>;
    requireGenerateRunner(): Promise<never>;
}
