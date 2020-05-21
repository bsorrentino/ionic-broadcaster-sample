import { CommandMetadata } from '../../definitions';
import { RunCommand } from './run';
export declare class EmulateCommand extends RunCommand {
    getMetadata(): Promise<CommandMetadata>;
}
