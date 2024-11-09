"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.merge = merge;
const deepMerge_js_1 = require("./deepMerge.js");
function merge(deep, ...objects) {
    if (deep) {
        return (0, deepMerge_js_1.deepMerge)(...objects);
    }
    else {
        return Object.assign({}, ...objects);
    }
}
//# sourceMappingURL=merge.js.map