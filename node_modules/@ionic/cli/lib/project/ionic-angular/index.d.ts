import { Project } from '../';
import { IAilmentRegistry, InfoItem } from '../../../definitions';
export declare class IonicAngularProject extends Project {
    readonly type: 'ionic-angular';
    getInfo(): Promise<InfoItem[]>;
    getDocsUrl(): Promise<string>;
    registerAilments(registry: IAilmentRegistry): Promise<void>;
    detected(): Promise<boolean>;
    requireBuildRunner(): Promise<import('./build').IonicAngularBuildRunner>;
    requireServeRunner(): Promise<import('./serve').IonicAngularServeRunner>;
    requireGenerateRunner(): Promise<import('./generate').IonicAngularGenerateRunner>;
}
