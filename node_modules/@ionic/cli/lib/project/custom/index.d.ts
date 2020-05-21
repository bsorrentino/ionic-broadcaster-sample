import { Project } from '../';
export declare class CustomProject extends Project {
    readonly type: 'custom';
    /**
     * We can't detect custom project types. We don't know what they look like!
     */
    detected(): Promise<boolean>;
    requireBuildRunner(): Promise<import('./build').CustomBuildRunner>;
    requireServeRunner(): Promise<import('./serve').CustomServeRunner>;
    requireGenerateRunner(): Promise<never>;
}
