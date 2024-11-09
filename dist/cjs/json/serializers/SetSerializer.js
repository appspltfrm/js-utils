"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetSerializer = void 0;
const resolveForwardRef_js_1 = require("../../core/resolveForwardRef.js");
const Serializer_js_1 = require("../Serializer.js");
const ObjectSerializer_js_1 = require("./ObjectSerializer.js");
class SetSerializer extends Serializer_js_1.Serializer {
    constructor(valueTypeOrSerializer) {
        super();
        if (arguments.length == 1 && !valueTypeOrSerializer) {
            throw new Error("Value type passed to SetSerializer is undefined - check for class reference cycle");
        }
        if (valueTypeOrSerializer) {
            this.typeOrSerializer = (0, resolveForwardRef_js_1.resolveForwardRef)(valueTypeOrSerializer);
        }
    }
    typeOrSerializer;
    serialize(value, options) {
        if (this.isUndefinedOrNull(value)) {
            return this.serializeUndefinedOrNull(value, options);
        }
        else if (value instanceof Set) {
            const array = [];
            const serializer = this.typeOrSerializer instanceof Serializer_js_1.Serializer ? this.typeOrSerializer : (this.typeOrSerializer && ObjectSerializer_js_1.ObjectSerializer.getTypeSerializer(this.typeOrSerializer, options?.typeProviders)) || ObjectSerializer_js_1.ObjectSerializer.instance;
            for (const i of value.values()) {
                array.push(serializer.serialize(i, options));
            }
            return array;
        }
        else if (!options || !options.ignoreErrors) {
            throw new Error(`Cannot serialize "${value}" as Set`);
        }
        else {
            return undefined;
        }
    }
    unserialize(json, options) {
        if (Array.isArray(json)) {
            const zet = new Set();
            const serializer = this.typeOrSerializer instanceof Serializer_js_1.Serializer ? this.typeOrSerializer : (this.typeOrSerializer && ObjectSerializer_js_1.ObjectSerializer.getTypeSerializer(this.typeOrSerializer, options?.typeProviders)) || ObjectSerializer_js_1.ObjectSerializer.instance;
            for (const i of json) {
                zet.add(serializer.unserialize(i, options));
            }
            return zet;
        }
        else if (this.isUndefinedOrNull(json)) {
            return this.unserializeUndefinedOrNull(json, options);
        }
        else if (!options || !options.ignoreErrors) {
            throw new Error(`Cannot unserialize "${json}" to Set`);
        }
        else {
            return undefined;
        }
    }
}
exports.SetSerializer = SetSerializer;
(function (SetSerializer) {
    SetSerializer.ofAny = new SetSerializer();
    SetSerializer.ofString = new SetSerializer(String);
    SetSerializer.ofNumber = new SetSerializer(Number);
    SetSerializer.ofBoolean = new SetSerializer(Boolean);
})(SetSerializer || (exports.SetSerializer = SetSerializer = {}));
//# sourceMappingURL=SetSerializer.js.map