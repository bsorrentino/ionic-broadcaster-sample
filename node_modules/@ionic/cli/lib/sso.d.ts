/// <reference types="node" />
import { IClient } from '../definitions';
export interface AuthorizationParameters {
    [key: string]: string;
}
export interface TokenParameters {
    [key: string]: string;
}
export interface OAuth2FlowOptions {
    readonly authorizationUrl: string;
    readonly tokenUrl: string;
    readonly clientId: string;
    readonly redirectHost?: string;
    readonly redirectPort?: number;
}
export interface OAuth2FlowDeps {
    readonly client: IClient;
}
export declare abstract class OAuth2Flow {
    readonly e: OAuth2FlowDeps;
    readonly authorizationUrl: string;
    readonly tokenUrl: string;
    readonly clientId: string;
    readonly redirectHost: string;
    readonly redirectPort: number;
    constructor({ authorizationUrl, tokenUrl, clientId, redirectHost, redirectPort }: OAuth2FlowOptions, e: OAuth2FlowDeps);
    get redirectUrl(): string;
    run(): Promise<string>;
    protected abstract generateAuthorizationParameters(challenge: string): AuthorizationParameters;
    protected abstract generateTokenParameters(authorizationCode: string, verifier: string): TokenParameters;
    protected getSuccessHtml(): Promise<string>;
    protected getAuthorizationCode(): Promise<string>;
    protected getAccessToken(authorizationCode: string, verifier: string): Promise<string>;
    protected generateVerifier(): string;
    protected generateChallenge(verifier: string): string;
    protected base64URLEncode(buffer: Buffer): string;
}
export interface Auth0OAuth2FlowOptions extends Partial<OAuth2FlowOptions> {
    readonly email: string;
    readonly connection: string;
    readonly audience?: string;
}
export declare class Auth0OAuth2Flow extends OAuth2Flow {
    readonly e: OAuth2FlowDeps;
    readonly email: string;
    readonly audience: string;
    readonly connection: string;
    constructor({ email, connection, audience, authorizationUrl, tokenUrl, clientId, ...options }: Auth0OAuth2FlowOptions, e: OAuth2FlowDeps);
    protected generateAuthorizationParameters(challenge: string): AuthorizationParameters;
    protected generateTokenParameters(code: string, verifier: string): TokenParameters;
}
