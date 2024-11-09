"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serialize = serialize;
const serializeImpl_js_1 = require("./serializeImpl.js");
function serialize(object, options) {
    return (0, serializeImpl_js_1.serializeImpl)(object, null, options);
}
//# sourceMappingURL=serialize.js.map