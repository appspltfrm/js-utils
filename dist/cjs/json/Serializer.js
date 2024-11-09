"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Serializer = void 0;
class Serializer {
    serialize(object, options) {
        return object;
    }
    isUndefinedOrNull(value) {
        return value === undefined || value === null;
    }
    serializeUndefinedOrNull(value, options) {
        return value;
    }
    unserializeUndefinedOrNull(value, options) {
        if (options && options.disallowUndefinedOrNull) {
            throw "Undefined/null value is not allowed";
        }
        else {
            return value;
        }
    }
}
exports.Serializer = Serializer;
//# sourceMappingURL=Serializer.js.map