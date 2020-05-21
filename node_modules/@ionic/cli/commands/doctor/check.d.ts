import { CommandLineInputs, CommandLineOptions, CommandMetadata, IAilment } from '../../definitions';
import { DoctorCommand } from './base';
export declare class DoctorCheckCommand extends DoctorCommand {
    getMetadata(): Promise<CommandMetadata>;
    run(inputs: CommandLineInputs, options: CommandLineOptions): Promise<void>;
    checkAilments(ailments: IAilment[]): Promise<void>;
    checkAilment(ailment: IAilment): Promise<void>;
}
