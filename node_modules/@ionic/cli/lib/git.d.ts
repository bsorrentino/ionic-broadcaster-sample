import { IShell } from '../definitions';
export interface GitUtilDeps {
    shell: IShell;
}
export declare function isGitInstalled({ shell }: GitUtilDeps): Promise<boolean>;
export declare function getTopLevel({ shell }: GitUtilDeps): Promise<string | undefined>;
export declare function isRepoInitialized(dir: string): Promise<boolean>;
export declare function initializeRepo({ shell }: GitUtilDeps, dir: string): Promise<void>;
export declare function getIonicRemote({ shell }: GitUtilDeps, dir: string): Promise<string | undefined>;
export declare function addIonicRemote({ shell }: GitUtilDeps, dir: string, url: string): Promise<void>;
export declare function setIonicRemote({ shell }: GitUtilDeps, dir: string, url: string): Promise<void>;
