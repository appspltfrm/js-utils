"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalType = globalType;
const registerGlobalProvider_js_1 = require("../registerGlobalProvider.js");
function globalType(options) {
    return function (classType) {
        (0, registerGlobalProvider_js_1.registerGlobalProvider)({ name: classType.jsonTypeName, type: classType }, options);
    };
}
//# sourceMappingURL=globalType.js.map