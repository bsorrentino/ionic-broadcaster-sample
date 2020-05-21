"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require("chalk");
const lodash = require("lodash");
exports.DEFAULT_COLORS = Object.freeze({
    strong: chalk.bold,
    weak: chalk.dim,
    input: chalk.cyan,
    success: chalk.green,
    failure: chalk.red,
    ancillary: chalk.cyan,
    log: Object.freeze({
        DEBUG: chalk.magenta,
        INFO: chalk.white,
        WARN: chalk.yellow,
        ERROR: chalk.red,
    }),
    help: Object.freeze({
        title: chalk.bold,
        group: Object.freeze({
            ["deprecated" /* DEPRECATED */]: chalk.yellow,
            ["beta" /* BETA */]: chalk.magenta,
            ["experimental" /* EXPERIMENTAL */]: chalk.red,
            ["paid" /* PAID */]: chalk.green,
        }),
    }),
});
exports.NO_COLORS = Object.freeze({
    strong: lodash.identity,
    weak: lodash.identity,
    input: lodash.identity,
    success: lodash.identity,
    failure: lodash.identity,
    ancillary: lodash.identity,
    log: Object.freeze({
        DEBUG: lodash.identity,
        INFO: lodash.identity,
        WARN: lodash.identity,
        ERROR: lodash.identity,
    }),
    help: Object.freeze({
        title: lodash.identity,
        group: Object.freeze({
            ["deprecated" /* DEPRECATED */]: lodash.identity,
            ["beta" /* BETA */]: lodash.identity,
            ["experimental" /* EXPERIMENTAL */]: lodash.identity,
            ["paid" /* PAID */]: lodash.identity,
        }),
    }),
});
