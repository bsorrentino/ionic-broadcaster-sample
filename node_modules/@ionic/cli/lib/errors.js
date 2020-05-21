"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cli_framework_1 = require("@ionic/cli-framework");
class BaseException extends cli_framework_1.BaseError {
    constructor() {
        super(...arguments);
        this.name = 'Exception';
    }
}
exports.BaseException = BaseException;
class FatalException extends BaseException {
    constructor(message = '', exitCode = 1) {
        super(message);
        this.message = message;
        this.exitCode = exitCode;
        this.fatal = true;
    }
}
exports.FatalException = FatalException;
class BuildCLIProgramNotFoundException extends BaseException {
}
exports.BuildCLIProgramNotFoundException = BuildCLIProgramNotFoundException;
class ServeCLIProgramNotFoundException extends BaseException {
}
exports.ServeCLIProgramNotFoundException = ServeCLIProgramNotFoundException;
class SessionException extends BaseException {
}
exports.SessionException = SessionException;
class RunnerException extends BaseException {
}
exports.RunnerException = RunnerException;
class RunnerNotFoundException extends RunnerException {
}
exports.RunnerNotFoundException = RunnerNotFoundException;
class IntegrationException extends BaseException {
}
exports.IntegrationException = IntegrationException;
class IntegrationNotFoundException extends IntegrationException {
}
exports.IntegrationNotFoundException = IntegrationNotFoundException;
class HookException extends BaseException {
}
exports.HookException = HookException;
