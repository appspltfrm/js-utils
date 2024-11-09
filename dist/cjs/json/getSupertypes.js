"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSupertypes = getSupertypes;
const getPrototypesTree_js_1 = require("./getPrototypesTree.js");
function getSupertypes(type) {
    return (0, getPrototypesTree_js_1.getPrototypesTree)(type.prototype).map(type => type.constructor);
}
//# sourceMappingURL=getSupertypes.js.map