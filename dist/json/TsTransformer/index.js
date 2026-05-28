"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = transformer;
const transformer_js_1 = require("./transformer.js");
function transformer(program) {
    return (0, transformer_js_1.createSerializableTransformer)(program);
}
