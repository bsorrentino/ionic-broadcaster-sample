import { IClient, ResourceClientLoad, SecurityProfile } from '../definitions';
import { ResourceClient } from './http';
export interface SecurityClientDeps {
    readonly client: IClient;
    readonly token: string;
}
export declare class SecurityClient extends ResourceClient implements ResourceClientLoad<SecurityProfile> {
    protected readonly client: IClient;
    protected readonly token: string;
    constructor({ client, token }: SecurityClientDeps);
    load(tag: string): Promise<SecurityProfile>;
}
