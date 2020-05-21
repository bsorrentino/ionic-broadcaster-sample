"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const guards_1 = require("../guards");
const http_1 = require("./http");
class AuthClient extends http_1.ResourceClient {
    constructor(e) {
        super();
        this.e = e;
        this.connections = new AuthConnectionClient(e);
    }
}
exports.AuthClient = AuthClient;
class AuthConnectionClient extends http_1.ResourceClient {
    constructor(e) {
        super();
        this.e = e;
    }
    async load(email) {
        const { req } = await this.e.client.make('GET', `/auth/connections/${email}`);
        const res = await this.e.client.do(req);
        if (!guards_1.isAuthConnectionResponse(res)) {
            throw http_1.createFatalAPIFormat(req, res);
        }
        return res.data;
    }
}
exports.AuthConnectionClient = AuthConnectionClient;
