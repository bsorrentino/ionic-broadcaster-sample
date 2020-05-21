import { AngularGenerateOptions, CommandLineInputs, CommandLineOptions, CommandMetadata } from '../../../definitions';
import { GenerateRunner, GenerateRunnerDeps } from '../../generate';
import { AngularProject } from './';
export interface AngularGenerateRunnerDeps extends GenerateRunnerDeps {
    readonly project: AngularProject;
}
export declare class AngularGenerateRunner extends GenerateRunner<AngularGenerateOptions> {
    protected readonly e: AngularGenerateRunnerDeps;
    constructor(e: AngularGenerateRunnerDeps);
    getCommandMetadata(): Promise<Partial<CommandMetadata>>;
    ensureCommandLine(inputs: CommandLineInputs, options: CommandLineOptions): Promise<void>;
    createOptionsFromCommandLine(inputs: CommandLineInputs, options: CommandLineOptions): AngularGenerateOptions;
    run(options: AngularGenerateOptions): Promise<void>;
    private validateFeatureType;
    private generateComponent;
}
