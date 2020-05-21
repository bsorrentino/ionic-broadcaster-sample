import { ProjectType, TreatableAilment } from '../../../definitions';
import { Ailment, AilmentDeps } from '../../doctor';
import { IonicAngularProject } from './';
export interface IonicAngularAilmentDeps extends AilmentDeps {
    readonly project: IonicAngularProject;
}
export declare abstract class IonicAngularAilment extends Ailment {
    readonly projects: ProjectType[];
    protected readonly project: IonicAngularProject;
    constructor(deps: IonicAngularAilmentDeps);
}
export declare class IonicAngularUpdateAvailable extends IonicAngularAilment {
    readonly id = "ionic-angular-update-available";
    currentVersion?: string;
    latestVersion?: string;
    getVersionPair(): Promise<[string, string]>;
    getMessage(): Promise<string>;
    detected(): Promise<boolean>;
    getTreatmentSteps(): Promise<{
        message: string;
    }[]>;
}
export declare class IonicAngularMajorUpdateAvailable extends IonicAngularAilment {
    readonly id = "ionic-angular-major-update-available";
    currentVersion?: string;
    latestVersion?: string;
    getVersionPair(): Promise<[string, string]>;
    getMessage(): Promise<string>;
    detected(): Promise<boolean>;
    getTreatmentSteps(): Promise<{
        message: string;
    }[]>;
}
export declare class AppScriptsUpdateAvailable extends IonicAngularAilment implements TreatableAilment {
    readonly id = "app-scripts-update-available";
    readonly treatable = true;
    currentVersion?: string;
    latestVersion?: string;
    getVersionPair(): Promise<[string, string]>;
    getMessage(): Promise<string>;
    detected(): Promise<boolean>;
    getTreatmentSteps(): Promise<{
        message: string;
        treat: () => Promise<void>;
    }[]>;
}
export declare class AppScriptsMajorUpdateAvailable extends IonicAngularAilment {
    readonly id = "app-scripts-major-update-available";
    currentVersion?: string;
    latestVersion?: string;
    getVersionPair(): Promise<[string, string]>;
    getMessage(): Promise<string>;
    detected(): Promise<boolean>;
    getTreatmentSteps(): Promise<{
        message: string;
    }[]>;
}
export declare class IonicAngularPackageJsonHasDefaultIonicBuildCommand extends IonicAngularAilment {
    readonly id = "ionic-angular-package-json-has-default-ionic-build-command";
    currentVersion?: string;
    latestVersion?: string;
    getMessage(): Promise<string>;
    detected(): Promise<boolean>;
    getTreatmentSteps(): Promise<{
        message: string;
    }[]>;
}
export declare class IonicAngularPackageJsonHasDefaultIonicServeCommand extends IonicAngularAilment {
    readonly id = "ionic-angular-package-json-has-default-ionic-serve-command";
    currentVersion?: string;
    latestVersion?: string;
    getMessage(): Promise<string>;
    detected(): Promise<boolean>;
    getTreatmentSteps(): Promise<{
        message: string;
    }[]>;
}
