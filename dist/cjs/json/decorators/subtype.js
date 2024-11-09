"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subtype = subtype;
const setupSerialization_js_1 = require("../setupSerialization.js");
function subtype(supertype, propertyOrMatcher, value) {
    return function (classType) {
        (0, setupSerialization_js_1.setupSerialization)(supertype);
        const internalType = supertype;
        const types = internalType.__jsonSubtypes = (internalType.hasOwnProperty("__jsonSubtypes") && internalType.__jsonSubtypes) || [];
        types.push({
            type: classType,
            property: typeof propertyOrMatcher === "string" ? propertyOrMatcher : undefined,
            value: value,
            matcher: typeof propertyOrMatcher === "function" ? propertyOrMatcher : undefined
        });
    };
}
//# sourceMappingURL=subtype.js.map