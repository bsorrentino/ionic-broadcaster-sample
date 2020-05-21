import { CommandLineInputs, CommandLineOptions, CommandMetadata, CommandPreRun } from '../../definitions';
import { SSLBaseCommand } from './base';
export declare class SSLGenerateCommand extends SSLBaseCommand implements CommandPreRun {
    getDefaultKeyPath(): string;
    getDefaultCertPath(): string;
    getMetadata(): Promise<CommandMetadata>;
    preRun(inputs: CommandLineInputs, options: CommandLineOptions): Promise<void>;
    run(inputs: CommandLineInputs, options: CommandLineOptions): Promise<void>;
    private formatSubj;
    private ensureDirectory;
    private checkExistingFile;
    private writeConfig;
}
