"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArraySerializer = void 0;
const resolveForwardRef_js_1 = require("../../core/resolveForwardRef.js");
const serializeImpl_js_1 = require("../serializeImpl.js");
const Serializer_js_1 = require("../Serializer.js");
const unserializeImpl_js_1 = require("../unserializeImpl.js");
class ArraySerializer extends Serializer_js_1.Serializer {
    constructor(valueTypeOrSerializer) {
        super();
        if (arguments.length == 1 && !valueTypeOrSerializer) {
            throw new Error("Value type passed to Json Array Serializer is undefined - check, whether class reference cycle");
        }
        if (valueTypeOrSerializer) {
            this.typeOrSerializer = (0, resolveForwardRef_js_1.resolveForwardRef)(valueTypeOrSerializer);
        }
    }
    typeOrSerializer;
    serialize(value, options) {
        const serializer = this.typeOrSerializer instanceof Serializer_js_1.Serializer ? this.typeOrSerializer : undefined;
        if (this.isUndefinedOrNull(value)) {
            return this.serializeUndefinedOrNull(value, options);
        }
        else if (Array.isArray(value)) {
            const array = [];
            for (const i of value) {
                array.push(serializer ? serializer.serialize(i, options) : (0, serializeImpl_js_1.serializeImpl)(i, this.typeOrSerializer, options));
            }
            return array;
        }
        else if (serializer) {
            return serializer.serialize(value, options);
        }
        else {
            return (0, serializeImpl_js_1.serializeImpl)(value, this.typeOrSerializer, options);
        }
    }
    unserialize(json, options) {
        const serializer = this.typeOrSerializer instanceof Serializer_js_1.Serializer ? this.typeOrSerializer : undefined;
        if (this.isUndefinedOrNull(json)) {
            return this.serializeUndefinedOrNull(json, options);
        }
        else if (Array.isArray(json)) {
            const array = [];
            for (const i of json) {
                array.push(serializer ? serializer.unserialize(i, options) : (0, unserializeImpl_js_1.unserializeImpl)(i, this.typeOrSerializer, options));
            }
            return array;
        }
        else if (serializer) {
            return serializer.unserialize(json, options);
        }
        else {
            return (0, unserializeImpl_js_1.unserializeImpl)(json, this.typeOrSerializer, options);
        }
    }
}
exports.ArraySerializer = ArraySerializer;
(function (ArraySerializer) {
    ArraySerializer.ofAny = new ArraySerializer();
    ArraySerializer.ofString = new ArraySerializer(String);
    ArraySerializer.ofNumber = new ArraySerializer(Number);
    ArraySerializer.ofBoolean = new ArraySerializer(Boolean);
})(ArraySerializer || (exports.ArraySerializer = ArraySerializer = {}));
//# sourceMappingURL=ArraySerializer.js.map