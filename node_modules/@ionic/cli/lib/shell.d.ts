/// <reference types="node" />
import { Subprocess, SubprocessOptions, WhichOptions } from '@ionic/utils-subprocess';
import { ChildProcess, SpawnOptions } from 'child_process';
import { ILogger, IShell, IShellOutputOptions, IShellRunOptions, IShellSpawnOptions } from '../definitions';
export interface ShellDeps {
    readonly log: ILogger;
}
export interface ShellOptions {
    readonly alterPath?: (p: string) => string;
}
export declare class Shell implements IShell {
    protected readonly e: ShellDeps;
    alterPath: (p: string) => string;
    constructor(e: ShellDeps, options?: ShellOptions);
    run(command: string, args: readonly string[], { stream, killOnExit, showCommand, showError, fatalOnNotFound, fatalOnError, truncateErrorOutput, ...crossSpawnOptions }: IShellRunOptions): Promise<void>;
    output(command: string, args: readonly string[], { fatalOnNotFound, fatalOnError, showError, showCommand, ...crossSpawnOptions }: IShellOutputOptions): Promise<string>;
    /**
     * When `child_process.spawn` isn't provided a full path to the command
     * binary, it behaves differently on Windows than other platforms. For
     * Windows, discover the full path to the binary, otherwise fallback to the
     * command provided.
     *
     * @see https://github.com/ionic-team/ionic-cli/issues/3563#issuecomment-425232005
     */
    resolveCommandPath(command: string, options: SpawnOptions): Promise<string>;
    which(command: string, { PATH }?: WhichOptions): Promise<string>;
    spawn(command: string, args: readonly string[], { showCommand, ...crossSpawnOptions }: IShellSpawnOptions): Promise<ChildProcess>;
    cmdinfo(command: string, args?: readonly string[]): Promise<string | undefined>;
    createSubprocess(command: string, args?: readonly string[], options?: SubprocessOptions): Promise<Subprocess>;
    protected prepareSpawnOptions(options: IShellSpawnOptions): void;
}
export declare function prependNodeModulesBinToPath(projectDir: string, p: string): string;
