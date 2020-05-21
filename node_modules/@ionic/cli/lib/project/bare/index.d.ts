import { Project } from '../';
export declare class BareProject extends Project {
    readonly type: 'bare';
    detected(): Promise<boolean>;
    requireBuildRunner(): Promise<never>;
    requireServeRunner(): Promise<never>;
    requireGenerateRunner(): Promise<never>;
}
