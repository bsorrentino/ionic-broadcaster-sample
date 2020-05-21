import { GithubBranch, GithubRepo, IClient, IPaginator, ResourceClientLoad, ResourceClientRequestModifiers, Response, TokenPaginatorState, User } from '../definitions';
import { ResourceClient } from './http';
export interface UserClientDeps {
    readonly client: IClient;
}
export declare class UserClient extends ResourceClient implements ResourceClientLoad<User> {
    readonly token: string;
    readonly e: UserClientDeps;
    constructor(token: string, e: UserClientDeps);
    load(id: number, modifiers?: ResourceClientRequestModifiers): Promise<User>;
    loadSelf(): Promise<User>;
    oAuthGithubLogin(id: number): Promise<string>;
    paginateGithubRepositories(id: number): IPaginator<Response<GithubRepo[]>, TokenPaginatorState>;
    paginateGithubBranches(userId: number, repoId: number): IPaginator<Response<GithubBranch[]>, TokenPaginatorState>;
}
