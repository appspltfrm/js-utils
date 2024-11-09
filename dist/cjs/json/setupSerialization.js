"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSerialization = setupSerialization;
const toFromJsonImpl_js_1 = require("./toFromJsonImpl.js");
function setupSerialization(type) {
    const internalType = type;
    internalType.__jsonSerialization = true;
    if (!type.prototype.hasOwnProperty("toJSON")) {
        internalType.__jsonToJson = true;
        type.prototype.toJSON = function (options) {
            return toFromJsonImpl_js_1.toJsonImpl.call(this);
        };
    }
    if (!type.hasOwnProperty("fromJSON")) {
        internalType.__jsonFromJson = true;
        internalType.fromJSON = function (json, options) {
            return toFromJsonImpl_js_1.fromJsonImpl.call(this, json, options);
        };
    }
}
//# sourceMappingURL=setupSerialization.js.map