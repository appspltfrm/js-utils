"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooleanSerializer = void 0;
const Serializer_js_1 = require("../Serializer.js");
class BooleanSerializer extends Serializer_js_1.Serializer {
    serialize(value, options) {
        if (this.isUndefinedOrNull(value)) {
            return this.serializeUndefinedOrNull(value, options);
        }
        else if (typeof value === "boolean") {
            return value;
        }
        else if (options && options.notStrict) {
            return !!value;
        }
        else if (!options || !options.ignoreErrors) {
            throw new Error(`Cannot serialize "${value}" as boolean`);
        }
        else {
            return undefined;
        }
    }
    unserialize(value, options) {
        if (typeof value === "boolean") {
            return value;
        }
        else if (this.isUndefinedOrNull(value)) {
            return this.unserializeUndefinedOrNull(value, options);
        }
        else if (options && options.notStrict) {
            return !!value;
        }
        else if (!options || !options.ignoreErrors) {
            throw new Error(`Cannot unserialize "${value}" to boolean`);
        }
        else {
            return undefined;
        }
    }
}
exports.BooleanSerializer = BooleanSerializer;
(function (BooleanSerializer) {
    BooleanSerializer.instance = new BooleanSerializer();
})(BooleanSerializer || (exports.BooleanSerializer = BooleanSerializer = {}));
//# sourceMappingURL=BooleanSerializer.js.map