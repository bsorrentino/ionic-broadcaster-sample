import { CommandLineInputs, CommandLineOptions, CommandMetadata, TreatableAilment } from '../../definitions';
import { DoctorCommand } from './base';
export declare class DoctorTreatCommand extends DoctorCommand {
    getMetadata(): Promise<CommandMetadata>;
    run(inputs: CommandLineInputs, options: CommandLineOptions): Promise<void>;
    treatAilments(ailments: TreatableAilment[]): Promise<void>;
    handleError(e: any): void;
    treatAilment(ailment: TreatableAilment): Promise<boolean>;
}
