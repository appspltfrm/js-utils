"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberSerializer = void 0;
const Serializer_js_1 = require("../Serializer.js");
class NumberSerializer extends Serializer_js_1.Serializer {
    serialize(value, options) {
        if (this.isUndefinedOrNull(value)) {
            return this.serializeUndefinedOrNull(value, options);
        }
        else if (typeof value === "number") {
            return value;
        }
        else if (options && options.notStrict && typeof value === "string") {
            return parseFloat(value);
        }
        else if (!options || !options.ignoreErrors) {
            throw new Error(`Cannot serialize "${value}" as number`);
        }
        else {
            return undefined;
        }
    }
    unserialize(value, options) {
        if (typeof value === "number") {
            return value;
        }
        else if (this.isUndefinedOrNull(value)) {
            return this.unserializeUndefinedOrNull(value, options);
        }
        else if (options && options.notStrict) {
            return parseFloat(value);
        }
        else if (!options || !options.ignoreErrors) {
            throw new Error(`Cannot unserialize "${value}" to number`);
        }
        else {
            return undefined;
        }
    }
}
exports.NumberSerializer = NumberSerializer;
(function (NumberSerializer) {
    NumberSerializer.instance = new NumberSerializer();
})(NumberSerializer || (exports.NumberSerializer = NumberSerializer = {}));
//# sourceMappingURL=NumberSerializer.js.map