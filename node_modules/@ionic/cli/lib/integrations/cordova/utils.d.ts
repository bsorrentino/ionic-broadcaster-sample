import { PromptModule } from '@ionic/cli-framework-prompts';
import { CommandLineInputs, CommandLineOptions, CommandMetadata, ILogger, ProjectType } from '../../../definitions';
export declare const SUPPORTED_PROJECT_TYPES: readonly ProjectType[];
/**
 * Filter and gather arguments from command line to be passed to Cordova
 */
export declare function filterArgumentsForCordova(metadata: CommandMetadata, options: CommandLineOptions): string[];
export declare function generateOptionsForCordovaBuild(metadata: CommandMetadata, inputs: CommandLineInputs, options: CommandLineOptions): CommandLineOptions;
export declare function checkForUnsupportedProject(type: ProjectType, cmd?: string): Promise<void>;
export interface ConfirmCordovaUsageDeps {
    log: ILogger;
    prompt: PromptModule;
}
export declare function confirmCordovaUsage({ log, prompt }: ConfirmCordovaUsageDeps): Promise<boolean>;
export declare function confirmCordovaBrowserUsage({ log, prompt }: ConfirmCordovaUsageDeps): Promise<boolean>;
