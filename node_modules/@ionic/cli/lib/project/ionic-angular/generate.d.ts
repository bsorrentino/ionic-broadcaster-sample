import { CommandLineInputs, CommandLineOptions, CommandMetadata, IonicAngularGenerateOptions } from '../../../definitions';
import { GenerateRunner, GenerateRunnerDeps } from '../../generate';
import { IonicAngularProject } from './';
export interface IonicAngularGenerateRunnerDeps extends GenerateRunnerDeps {
    readonly project: IonicAngularProject;
}
export declare class IonicAngularGenerateRunner extends GenerateRunner<IonicAngularGenerateOptions> {
    protected readonly e: IonicAngularGenerateRunnerDeps;
    constructor(e: IonicAngularGenerateRunnerDeps);
    getCommandMetadata(): Promise<Partial<CommandMetadata>>;
    ensureCommandLine(inputs: CommandLineInputs, options: CommandLineOptions): Promise<void>;
    createOptionsFromCommandLine(inputs: CommandLineInputs, options: CommandLineOptions): IonicAngularGenerateOptions;
    run(options: IonicAngularGenerateOptions): Promise<void>;
    tabsPrompt(): Promise<string[]>;
    getModules(context: any, kind: string): Promise<any>;
}
