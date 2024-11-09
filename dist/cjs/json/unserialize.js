"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unserialize = unserialize;
const unserializeImpl_js_1 = require("./unserializeImpl.js");
function unserialize(json, targetClass, options) {
    if (json === undefined || json === null) {
        return json;
    }
    return (0, unserializeImpl_js_1.unserializeImpl)(json, targetClass, options);
}
//# sourceMappingURL=unserialize.js.map