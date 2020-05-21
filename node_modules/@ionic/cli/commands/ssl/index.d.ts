import { MetadataGroup } from '@ionic/cli-framework';
import { CommandMap, Namespace } from '../../lib/namespace';
export declare class SSLNamespace extends Namespace {
    getMetadata(): Promise<{
        name: string;
        summary: string;
        groups: MetadataGroup[];
        description: string;
    }>;
    getCommands(): Promise<CommandMap>;
}
