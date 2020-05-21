import { CommandMap, Namespace } from '../../lib/namespace';
export declare class DoctorNamespace extends Namespace {
    getMetadata(): Promise<{
        name: string;
        summary: string;
    }>;
    getCommands(): Promise<CommandMap>;
}
