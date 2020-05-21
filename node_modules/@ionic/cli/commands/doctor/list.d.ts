import { CommandLineInputs, CommandLineOptions, CommandMetadata } from '../../definitions';
import { DoctorCommand } from './base';
export declare class DoctorListCommand extends DoctorCommand {
    getMetadata(): Promise<CommandMetadata>;
    run(inputs: CommandLineInputs, options: CommandLineOptions): Promise<void>;
}
