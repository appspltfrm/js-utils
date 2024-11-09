"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ignore = ignore;
const setupSerialization_js_1 = require("../setupSerialization.js");
function ignore() {
    return function (classPrototype, propertyName, propertyDescriptor) {
        const internalType = classPrototype.constructor;
        (0, setupSerialization_js_1.setupSerialization)(internalType);
        const properties = internalType.__jsonIgnoredProperties = (internalType.hasOwnProperty("__jsonIgnoredProperties") && internalType.__jsonIgnoredProperties) || [];
        properties.push(propertyName);
    };
}
//# sourceMappingURL=ignore.js.map