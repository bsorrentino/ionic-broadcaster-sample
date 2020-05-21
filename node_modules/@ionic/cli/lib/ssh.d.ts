import { IClient, IPaginator, PaginateArgs, PaginatorState, ResourceClientCreate, ResourceClientDelete, ResourceClientLoad, ResourceClientPaginate, Response, SSHKey } from '../definitions';
import { ResourceClient } from './http';
export declare const ERROR_SSH_MISSING_PRIVKEY = "SSH_MISSING_PRIVKEY";
export declare const ERROR_SSH_INVALID_PUBKEY = "SSH_INVALID_PUBKEY";
export declare const ERROR_SSH_INVALID_PRIVKEY = "SSH_INVALID_PRIVKEY";
export declare function getGeneratedPrivateKeyPath(userId?: number): Promise<string>;
export declare function parsePublicKeyFile(pubkeyPath: string): Promise<[string, string, string, string]>;
/**
 * @return [full pubkey, algorithm, public numbers, annotation]
 */
export declare function parsePublicKey(pubkey: string): [string, string, string, string];
export declare function validatePrivateKey(keyPath: string): Promise<void>;
export interface SSHKeyClientDeps {
    readonly client: IClient;
    readonly token: string;
    readonly user: {
        id: number;
    };
}
export interface SSHKeyCreateDetails {
    pubkey: string;
}
export declare class SSHKeyClient extends ResourceClient implements ResourceClientLoad<SSHKey>, ResourceClientDelete, ResourceClientCreate<SSHKey, SSHKeyCreateDetails>, ResourceClientPaginate<SSHKey> {
    protected client: IClient;
    protected token: string;
    protected user: {
        id: number;
    };
    constructor({ client, token, user }: SSHKeyClientDeps);
    create({ pubkey }: SSHKeyCreateDetails): Promise<SSHKey>;
    load(id: string): Promise<SSHKey>;
    delete(id: string): Promise<void>;
    paginate(args?: Partial<PaginateArgs<Response<SSHKey[]>>>): IPaginator<Response<SSHKey[]>, PaginatorState>;
}
