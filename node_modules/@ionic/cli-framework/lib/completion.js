"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash = require("lodash");
const guards_1 = require("../guards");
const colors_1 = require("./colors");
const options_1 = require("./options");
async function getCompletionWords(ns, argv) {
    const { obj } = await ns.locate(argv, { useAliases: false });
    if (guards_1.isCommand(obj)) {
        const metadata = await obj.getMetadata();
        const options = metadata.options ? metadata.options : [];
        if (options.length === 0) {
            return [];
        }
        const optionNames = options
            .map(option => options_1.formatOptionName(option, { showAliases: false, showValueSpec: false, colors: colors_1.NO_COLORS }))
            .filter(name => !argv.includes(name));
        const aliasNames = lodash.flatten(options.map(option => option.aliases ? option.aliases : []))
            .map(alias => `-${alias}`);
        return [...optionNames, ...aliasNames].sort();
    }
    return [
        ...(await obj.getCommands()).keysWithoutAliases(),
        ...(await obj.getNamespaces()).keysWithoutAliases(),
    ].sort();
}
exports.getCompletionWords = getCompletionWords;
class CompletionFormatter {
    constructor({ namespace }) {
        this.namespace = namespace;
    }
}
exports.CompletionFormatter = CompletionFormatter;
class ZshCompletionFormatter extends CompletionFormatter {
    async format() {
        const { name } = await this.namespace.getMetadata();
        return `
###-begin-${name}-completion-###

if type compdef &>/dev/null; then
  __${name}() {
    compadd -- $(${name} completion -- "$\{words[@]}" 2>/dev/null)
  }

  compdef __${name} ${name}
fi

###-end-${name}-completion-###
`;
    }
}
exports.ZshCompletionFormatter = ZshCompletionFormatter;
