import { MetadataGroup } from '@ionic/cli-framework';
import { CommandMap, Namespace } from '../../lib/namespace';
export declare class PackageNamespace extends Namespace {
    getMetadata(): Promise<{
        name: string;
        summary: string;
        description: string;
        groups: MetadataGroup[];
    }>;
    getCommands(): Promise<CommandMap>;
}
