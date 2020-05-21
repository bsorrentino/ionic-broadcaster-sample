import { CommandMetadata } from '../definitions';
import { Command } from '../lib/command';
export declare class ShareCommand extends Command {
    getMetadata(): Promise<CommandMetadata>;
    run(): Promise<void>;
}
