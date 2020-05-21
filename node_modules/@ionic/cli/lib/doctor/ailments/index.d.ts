import { TreatableAilment } from '../../../definitions';
import { Ailment } from './base';
export * from './base';
export * from './utils';
export declare class NpmInstalledLocally extends Ailment implements TreatableAilment {
    readonly id = "npm-installed-locally";
    readonly treatable = true;
    getMessage(): Promise<string>;
    detected(): Promise<boolean>;
    getTreatmentSteps(): Promise<{
        message: string;
        treat: () => Promise<void>;
    }[]>;
}
export declare class IonicCLIInstalledLocally extends Ailment implements TreatableAilment {
    readonly id = "ionic-installed-locally";
    readonly treatable = true;
    getMessage(): Promise<string>;
    detected(): Promise<boolean>;
    getTreatmentSteps(): Promise<{
        message: string;
        treat: () => Promise<void>;
    }[]>;
}
export declare class GitNotUsed extends Ailment {
    readonly id = "git-not-used";
    getMessage(): Promise<string>;
    detected(): Promise<boolean>;
    getTreatmentSteps(): Promise<{
        message: string;
    }[]>;
}
export declare class GitConfigInvalid extends Ailment {
    readonly id = "git-config-invalid";
    getMessage(): Promise<string>;
    detected(): Promise<boolean>;
    getTreatmentSteps(): Promise<{
        message: string;
    }[]>;
}
export declare class IonicNativeOldVersionInstalled extends Ailment {
    readonly id = "ionic-native-old-version-installed";
    getMessage(): Promise<string>;
    detected(): Promise<boolean>;
    getTreatmentSteps(): Promise<{
        message: string;
    }[]>;
}
export declare class UnsavedCordovaPlatforms extends Ailment {
    readonly id = "unsaved-cordova-platforms";
    getMessage(): Promise<string>;
    detected(): Promise<boolean>;
    getTreatmentSteps(): Promise<{
        message: string;
    }[]>;
}
export declare class DefaultCordovaBundleIdUsed extends Ailment {
    readonly id = "default-cordova-bundle-id-used";
    getMessage(): Promise<string>;
    detected(): Promise<boolean>;
    getTreatmentSteps(): Promise<{
        message: string;
    }[]>;
}
export declare class ViewportFitNotSet extends Ailment {
    readonly id: 'viewport-fit-not-set';
    getMessage(): Promise<string>;
    detected(): Promise<boolean>;
    getTreatmentSteps(): Promise<{
        message: string;
    }[]>;
}
export declare class CordovaPlatformsCommitted extends Ailment {
    readonly id = "cordova-platforms-committed";
    getMessage(): Promise<string>;
    detected(): Promise<boolean>;
    getTreatmentSteps(): Promise<{
        message: string;
    }[]>;
}
