import { Project } from '../';
import { IAilmentRegistry, InfoItem } from '../../../definitions';
export declare class AngularProject extends Project {
    readonly type: 'angular';
    getInfo(): Promise<InfoItem[]>;
    detected(): Promise<boolean>;
    requireBuildRunner(): Promise<import('./build').AngularBuildRunner>;
    requireServeRunner(): Promise<import('./serve').AngularServeRunner>;
    requireGenerateRunner(): Promise<import('./generate').AngularGenerateRunner>;
    registerAilments(registry: IAilmentRegistry): Promise<void>;
    setPrimaryTheme(themeColor: string): Promise<void>;
}
