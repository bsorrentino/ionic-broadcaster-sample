"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cli_framework_1 = require("@ionic/cli-framework");
class CommandMap extends cli_framework_1.BaseCommandMap {
}
exports.CommandMap = CommandMap;
class NamespaceMap extends cli_framework_1.BaseNamespaceMap {
}
exports.NamespaceMap = NamespaceMap;
class Namespace extends cli_framework_1.BaseNamespace {
    constructor(parent) {
        super(parent);
        this.parent = parent;
    }
    get env() {
        return this.root.env;
    }
    get project() {
        return this.root.project;
    }
}
exports.Namespace = Namespace;
