import { HookFn, HookInput, HookName, IConfig, IProject, IShell } from '../definitions';
export interface HookDeps {
    readonly config: IConfig;
    readonly project: IProject;
    readonly shell: IShell;
}
export declare abstract class Hook {
    protected readonly e: HookDeps;
    abstract readonly name: HookName;
    get script(): string;
    constructor(e: HookDeps);
    run(input: HookInput): Promise<void>;
    protected loadHookFn(p: string): Promise<HookFn | undefined>;
    private generateCTXEnvironment;
}
export declare function addHook(baseDir: string, hooks: string | string[] | undefined, hook: string): string[];
export declare function removeHook(baseDir: string, hooks: string | string[] | undefined, hook: string): string[];
export declare function locateHook(baseDir: string, hooks: string[], hook: string): number;
