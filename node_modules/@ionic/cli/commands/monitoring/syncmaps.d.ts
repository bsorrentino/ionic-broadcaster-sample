import { APIResponseSuccess, CommandLineInputs, CommandLineOptions, CommandMetadata } from '../../definitions';
import { Command } from '../../lib/command';
export declare class MonitoringSyncSourcemapsCommand extends Command {
    getMetadata(): Promise<CommandMetadata>;
    run(inputs: CommandLineInputs, options: CommandLineOptions): Promise<void>;
    syncSourcemap(file: string, snapshotId: string, appVersion: string, commitHash: string, appflowId: string, token: string): Promise<void>;
    uploadSourcemap(sourcemap: APIResponseSuccess, file: string): Promise<void>;
}
