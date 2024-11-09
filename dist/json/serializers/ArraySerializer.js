import { resolveForwardRef } from "../../core/resolveForwardRef.js";
import { serializeImpl } from "../serializeImpl.js";
import { Serializer } from "../Serializer.js";
import { unserializeImpl } from "../unserializeImpl.js";
export class ArraySerializer extends Serializer {
    constructor(valueTypeOrSerializer) {
        super();
        if (arguments.length == 1 && !valueTypeOrSerializer) {
            throw new Error("Value type passed to Json Array Serializer is undefined - check, whether class reference cycle");
        }
        if (valueTypeOrSerializer) {
            this.typeOrSerializer = resolveForwardRef(valueTypeOrSerializer);
        }
    }
    typeOrSerializer;
    serialize(value, options) {
        const serializer = this.typeOrSerializer instanceof Serializer ? this.typeOrSerializer : undefined;
        if (this.isUndefinedOrNull(value)) {
            return this.serializeUndefinedOrNull(value, options);
        }
        else if (Array.isArray(value)) {
            const array = [];
            for (const i of value) {
                array.push(serializer ? serializer.serialize(i, options) : serializeImpl(i, this.typeOrSerializer, options));
            }
            return array;
        }
        else if (serializer) {
            return serializer.serialize(value, options);
        }
        else {
            return serializeImpl(value, this.typeOrSerializer, options);
        }
    }
    unserialize(json, options) {
        const serializer = this.typeOrSerializer instanceof Serializer ? this.typeOrSerializer : undefined;
        if (this.isUndefinedOrNull(json)) {
            return this.serializeUndefinedOrNull(json, options);
        }
        else if (Array.isArray(json)) {
            const array = [];
            for (const i of json) {
                array.push(serializer ? serializer.unserialize(i, options) : unserializeImpl(i, this.typeOrSerializer, options));
            }
            return array;
        }
        else if (serializer) {
            return serializer.unserialize(json, options);
        }
        else {
            return unserializeImpl(json, this.typeOrSerializer, options);
        }
    }
}
(function (ArraySerializer) {
    ArraySerializer.ofAny = new ArraySerializer();
    ArraySerializer.ofString = new ArraySerializer(String);
    ArraySerializer.ofNumber = new ArraySerializer(Number);
    ArraySerializer.ofBoolean = new ArraySerializer(Boolean);
})(ArraySerializer || (ArraySerializer = {}));
//# sourceMappingURL=ArraySerializer.js.map