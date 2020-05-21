import { APIResponse, APIResponsePageTokenMeta, APIResponseSuccess, HttpMethod, IClient, IConfig, IPaginator, PagePaginatorState, PaginateArgs, PaginatorDeps, PaginatorGuard, PaginatorRequestGenerator, ResourceClientRequestModifiers, Response, SuperAgentError, TokenPaginatorState } from '../definitions';
import { FatalException } from './errors';
export declare type SuperAgentRequest = import('superagent').SuperAgentRequest;
export declare type SuperAgentResponse = import('superagent').Response;
export declare const CONTENT_TYPE_JSON = "application/json";
export declare const ERROR_UNKNOWN_CONTENT_TYPE = "UNKNOWN_CONTENT_TYPE";
export declare const ERROR_UNKNOWN_RESPONSE_FORMAT = "UNKNOWN_RESPONSE_FORMAT";
export declare class Client implements IClient {
    config: IConfig;
    constructor(config: IConfig);
    make(method: HttpMethod, path: string): Promise<{
        req: SuperAgentRequest;
    }>;
    do(req: SuperAgentRequest): Promise<APIResponseSuccess>;
    paginate<T extends Response<object[]>>(args: PaginateArgs<T>): IPaginator<T>;
}
export declare class Paginator<T extends Response<object[]>> implements IPaginator<T, PagePaginatorState> {
    protected client: IClient;
    protected reqgen: PaginatorRequestGenerator;
    protected guard: PaginatorGuard<T>;
    protected max?: number;
    readonly state: PagePaginatorState;
    constructor({ client, reqgen, guard, state, max }: PaginatorDeps<T, PagePaginatorState>);
    next(): IteratorResult<Promise<T>>;
    [Symbol.iterator](): this;
}
export declare class TokenPaginator<T extends Response<object[]>> implements IPaginator<T, TokenPaginatorState> {
    protected client: IClient;
    protected reqgen: PaginatorRequestGenerator;
    protected guard: PaginatorGuard<T>;
    protected max?: number;
    readonly state: TokenPaginatorState;
    constructor({ client, reqgen, guard, state, max }: PaginatorDeps<T, TokenPaginatorState>);
    next(): IteratorResult<Promise<T>>;
    isPageTokenResponseMeta(meta: any): meta is APIResponsePageTokenMeta;
    [Symbol.iterator](): this;
}
export declare abstract class ResourceClient {
    protected applyModifiers(req: import('superagent').Request, modifiers?: ResourceClientRequestModifiers): void;
    protected applyAuthentication(req: import('superagent').Request, token: string): void;
}
export declare function transformAPIResponse(r: SuperAgentResponse): APIResponse;
export declare function createFatalAPIFormat(req: SuperAgentRequest, res: APIResponse): FatalException;
export declare function formatSuperAgentError(e: SuperAgentError): string;
export declare function formatResponseError(req: SuperAgentRequest, status?: number, body?: object | string): string;
