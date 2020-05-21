import { IClient, IPaginator, PaginateArgs, ResourceClientLoad, ResourceClientPaginate, Response, Snapshot } from '../definitions';
import { ResourceClient } from './http';
export interface SnapshotClientDeps {
    readonly client: IClient;
    readonly token: string;
    readonly app: {
        id: string;
    };
}
export declare class SnapshotClient extends ResourceClient implements ResourceClientLoad<Snapshot>, ResourceClientPaginate<Snapshot> {
    protected client: IClient;
    protected token: string;
    protected app: {
        id: string;
    };
    constructor({ client, app, token }: SnapshotClientDeps);
    load(id: string): Promise<Snapshot>;
    paginate(args?: Partial<PaginateArgs<Response<Snapshot[]>>>): IPaginator<Response<Snapshot[]>>;
}
