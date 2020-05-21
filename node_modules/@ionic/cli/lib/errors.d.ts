import { BaseError } from '@ionic/cli-framework';
export declare class BaseException extends BaseError {
    readonly name = "Exception";
}
export declare class FatalException extends BaseException {
    message: string;
    exitCode: number;
    fatal: boolean;
    constructor(message?: string, exitCode?: number);
}
export declare class BuildCLIProgramNotFoundException extends BaseException {
}
export declare class ServeCLIProgramNotFoundException extends BaseException {
}
export declare class SessionException extends BaseException {
}
export declare class RunnerException extends BaseException {
}
export declare class RunnerNotFoundException extends RunnerException {
}
export declare class IntegrationException extends BaseException {
}
export declare class IntegrationNotFoundException extends IntegrationException {
}
export declare class HookException extends BaseException {
}
