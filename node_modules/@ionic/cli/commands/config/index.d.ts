import { CommandMap, Namespace } from '../../lib/namespace';
export declare class ConfigNamespace extends Namespace {
    getMetadata(): Promise<{
        name: string;
        summary: string;
        description: string;
    }>;
    getCommands(): Promise<CommandMap>;
}
