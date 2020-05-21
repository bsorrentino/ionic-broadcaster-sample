import { Project } from '../';
import { InfoItem } from '../../../definitions';
export declare class ReactProject extends Project {
    readonly type: 'react';
    getInfo(): Promise<InfoItem[]>;
    /**
     * We can't detect React project types. We don't know what they look like!
     */
    detected(): Promise<boolean>;
    getDefaultDistDir(): Promise<string>;
    requireBuildRunner(): Promise<import('./build').ReactBuildRunner>;
    requireServeRunner(): Promise<import('./serve').ReactServeRunner>;
    requireGenerateRunner(): Promise<never>;
    setPrimaryTheme(themeColor: string): Promise<void>;
}
