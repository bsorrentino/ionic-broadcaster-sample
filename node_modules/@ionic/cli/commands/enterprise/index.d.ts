import { MetadataGroup } from '@ionic/cli-framework';
import { CommandMap, Namespace } from '../../lib/namespace';
export declare class EnterpriseNamespace extends Namespace {
    getMetadata(): Promise<{
        name: string;
        summary: string;
        description: string;
        footnotes: {
            id: string;
            url: string;
            shortUrl: string;
        }[];
        groups: MetadataGroup[];
    }>;
    getCommands(): Promise<CommandMap>;
}
