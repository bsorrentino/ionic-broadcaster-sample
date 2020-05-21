"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function resolveValue(...fns) {
    for (const fn of fns) {
        const result = await fn();
        if (typeof result !== 'undefined') {
            return result;
        }
    }
}
exports.resolveValue = resolveValue;
function resolveValueSync(...fns) {
    for (const fn of fns) {
        const result = fn();
        if (typeof result !== 'undefined') {
            return result;
        }
    }
}
exports.resolveValueSync = resolveValueSync;
