import { IAilment, IAilmentRegistry, TreatableAilment } from '../../definitions';
import { Command } from '../../lib/command';
export declare abstract class DoctorCommand extends Command {
    getRegistry(): Promise<IAilmentRegistry>;
    detectAilments(): Promise<IAilment[]>;
    detectTreatableAilments(): Promise<TreatableAilment[]>;
}
