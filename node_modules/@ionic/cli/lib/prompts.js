"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const color_1 = require("./color");
function createOnFallback({ flags: { confirm }, log }) {
    return (question) => {
        if (question.type === 'confirm') {
            if (confirm) {
                log.msg(`${color_1.input('--confirm')}: ${color_1.weak(question.message)} ${color_1.ancillary('Yes')}`);
                return true;
            }
            else {
                log.msg(`${color_1.input('--no-confirm')}: ${color_1.weak(question.message)} ${color_1.ancillary('No')}`);
                return false;
            }
        }
    };
}
exports.createOnFallback = createOnFallback;
