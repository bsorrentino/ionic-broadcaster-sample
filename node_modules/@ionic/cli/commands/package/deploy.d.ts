import { CommandLineInputs, CommandLineOptions } from '@ionic/cli-framework';
import { CommandMetadata } from '../../definitions';
import { Command } from '../../lib/command';
import { PackageBuild } from './build';
interface BinaryDeployment {
    id: number;
    user: any;
    build: any;
    type: string;
    distributionCredential: any;
    destination: string;
    message: string;
    distributionBuildId: number;
    status: string;
}
interface DistributionBuild {
    job_id: number;
    id: string;
    caller_id: number;
    created: string;
    state: string;
    distribution_credential_name: string;
    package_build: PackageBuild;
    binary_deployment: BinaryDeployment;
    distribution_trace: string;
}
export declare class DeployCommand extends Command {
    getMetadata(): Promise<CommandMetadata>;
    preRun(inputs: CommandLineInputs, options: CommandLineOptions): Promise<void>;
    run(inputs: CommandLineInputs, options: CommandLineOptions): Promise<void>;
    createDeploymentBuild(appflowId: string, token: string, buildId: string, destination: string): Promise<DistributionBuild>;
    tailBuildLog(appflowId: string, buildId: number, token: string): Promise<PackageBuild>;
    getGenericBuild(appflowId: string, buildId: number, token: string): Promise<PackageBuild>;
}
export {};
