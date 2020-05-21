import { App, AppAssociation, AssociationType, IClient, IPaginator, PaginateArgs, PaginatorState, ResourceClientCreate, ResourceClientLoad, ResourceClientPaginate, Response } from '../definitions';
import { ResourceClient } from './http';
export declare function formatName(app: Pick<App, 'name' | 'org'>): string;
export interface AppClientDeps {
    readonly client: IClient;
}
export interface AppCreateDetails {
    readonly name: string;
    readonly org_id?: string;
}
export declare class AppClient extends ResourceClient implements ResourceClientLoad<App>, ResourceClientCreate<App, AppCreateDetails>, ResourceClientPaginate<App> {
    readonly token: string;
    readonly e: AppClientDeps;
    constructor(token: string, e: AppClientDeps);
    load(id: string): Promise<App>;
    create(details: AppCreateDetails): Promise<App>;
    paginate(args?: Partial<PaginateArgs<Response<App[]>>>, orgId?: string): IPaginator<Response<App[]>, PaginatorState>;
    createAssociation(id: string, association: {
        repoId: number;
        type: AssociationType;
        branches: string[];
    }): Promise<AppAssociation>;
    deleteAssociation(id: string): Promise<void>;
}
