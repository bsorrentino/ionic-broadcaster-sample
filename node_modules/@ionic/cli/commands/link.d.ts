import { App, CommandInstanceInfo, CommandLineInputs, CommandLineOptions, CommandMetadata, CommandPreRun } from '../definitions';
import { Command } from '../lib/command';
export declare class LinkCommand extends Command implements CommandPreRun {
    getMetadata(): Promise<CommandMetadata>;
    preRun(inputs: CommandLineInputs, options: CommandLineOptions): Promise<void>;
    run(inputs: CommandLineInputs, options: CommandLineOptions, runinfo: CommandInstanceInfo): Promise<void>;
    private getAppClient;
    private getUserClient;
    lookUpApp(id: string): Promise<App>;
    createApp({ name }: {
        name: string;
    }, runinfo: CommandInstanceInfo): Promise<string>;
    linkApp(app: App, runinfo: CommandInstanceInfo): Promise<void>;
    linkGithub(app: App): Promise<string | undefined>;
    confirmGithubRepoExists(): Promise<void>;
    oAuthProcess(userId: number): Promise<void>;
    needsAssociation(app: App, userId: number): Promise<boolean>;
    connectGithub(app: App, repoId: number, branches: string[]): Promise<string | undefined>;
    formatRepoName(fullName: string): string;
    chooseApp(apps: App[]): Promise<string>;
    selectGithubRepo(): Promise<number>;
    selectGithubBranches(repoId: number): Promise<string[]>;
}
