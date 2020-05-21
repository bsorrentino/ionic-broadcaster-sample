import { IClient, ResourceClientLoad } from '../definitions';
import { ResourceClient } from './http';
export interface AuthConnection {
    readonly uuid: string;
}
export interface AuthClientDeps {
    readonly client: IClient;
}
export declare class AuthClient extends ResourceClient {
    readonly e: AuthClientDeps;
    readonly connections: AuthConnectionClient;
    constructor(e: AuthClientDeps);
}
export declare class AuthConnectionClient extends ResourceClient implements ResourceClientLoad<AuthConnection> {
    readonly e: AuthClientDeps;
    constructor(e: AuthClientDeps);
    load(email: string): Promise<AuthConnection>;
}
