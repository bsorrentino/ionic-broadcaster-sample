/// <reference types="node" />
import { CreateRequestOptions, HttpMethod } from '../../definitions';
export declare type SuperAgentRequest = import('superagent').SuperAgentRequest;
export declare const PROXY_ENVIRONMENT_VARIABLES: readonly string[];
export declare function createRequest(method: HttpMethod, url: string, { userAgent, proxy, ssl }: CreateRequestOptions): Promise<{
    req: SuperAgentRequest;
}>;
/**
 * Initiate a request, downloading the contents to a writable stream.
 *
 * @param req The request to download to the writable stream.
 * @param ws Must be a dedicated writable stream that calls the 'close' event.
 */
export declare function download(req: SuperAgentRequest, ws: NodeJS.WritableStream, { progress }: {
    progress?: (loaded: number, total: number) => void;
}): Promise<void>;
