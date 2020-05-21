"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const guards_1 = require("../guards");
const http_1 = require("./http");
class UserClient extends http_1.ResourceClient {
    constructor(token, e) {
        super();
        this.token = token;
        this.e = e;
    }
    async load(id, modifiers) {
        const { req } = await this.e.client.make('GET', `/users/${id}`);
        this.applyAuthentication(req, this.token);
        this.applyModifiers(req, modifiers);
        const res = await this.e.client.do(req);
        if (!guards_1.isUserResponse(res)) {
            throw http_1.createFatalAPIFormat(req, res);
        }
        return res.data;
    }
    async loadSelf() {
        const { req } = await this.e.client.make('GET', '/users/self');
        this.applyAuthentication(req, this.token);
        const res = await this.e.client.do(req);
        if (!guards_1.isUserResponse(res)) {
            throw http_1.createFatalAPIFormat(req, res);
        }
        return res.data;
    }
    async oAuthGithubLogin(id) {
        const { req } = await this.e.client.make('POST', `/users/${id}/oauth/github`);
        this.applyAuthentication(req, this.token);
        req.send({ source: 'cli' });
        const res = await this.e.client.do(req);
        if (!guards_1.isOAuthLoginResponse(res)) {
            throw http_1.createFatalAPIFormat(req, res);
        }
        return res.data.redirect_url;
    }
    paginateGithubRepositories(id) {
        return new http_1.TokenPaginator({
            client: this.e.client,
            reqgen: async () => {
                const { req } = await this.e.client.make('GET', `/users/${id}/oauth/github/repositories`);
                req.set('Authorization', `Bearer ${this.token}`);
                return { req };
            },
            guard: guards_1.isGithubRepoListResponse,
        });
    }
    paginateGithubBranches(userId, repoId) {
        return new http_1.TokenPaginator({
            client: this.e.client,
            reqgen: async () => {
                const { req } = await this.e.client.make('GET', `/users/${userId}/oauth/github/repositories/${repoId}/branches`);
                req.set('Authorization', `Bearer ${this.token}`);
                return { req };
            },
            guard: guards_1.isGithubBranchListResponse,
        });
    }
}
exports.UserClient = UserClient;
