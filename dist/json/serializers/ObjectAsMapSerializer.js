import { Serializer } from "../Serializer.js";
import { ObjectSerializer } from "./ObjectSerializer.js";
/**
 * Serializer of objects, that should be treated as Maps, where key is always a string and value of given type.
 */
export class ObjectAsMapSerializer extends Serializer {
    constructor(valueTypeOrSerializer) {
        super();
        this.typeOrSerializer = valueTypeOrSerializer;
    }
    typeOrSerializer;
    serialize(value, options) {
        if (this.isUndefinedOrNull(value)) {
            return this.serializeUndefinedOrNull(value, options);
        }
        else if (typeof value === "object") {
            const serializer = this.typeOrSerializer instanceof Serializer ? this.typeOrSerializer : (this.typeOrSerializer && ObjectSerializer.getTypeSerializer(this.typeOrSerializer, options?.typeProviders)) || ObjectSerializer.instance;
            const json = {};
            for (const i in value) {
                json[i] = serializer.serialize(value[i], options);
            }
            return json;
        }
        else if (!options || !options.ignoreErrors) {
            throw new Error(`Cannot serialize "${value}" as object`);
        }
        else {
            return undefined;
        }
    }
    unserialize(value, options) {
        if (this.isUndefinedOrNull(value)) {
            return this.unserializeUndefinedOrNull(value, options);
        }
        else if (typeof value === "object") {
            const serializer = this.typeOrSerializer instanceof Serializer ? this.typeOrSerializer : (this.typeOrSerializer && ObjectSerializer.getTypeSerializer(this.typeOrSerializer, options?.typeProviders)) || ObjectSerializer.instance;
            const object = {};
            for (const i in value) {
                object[i] = serializer.unserialize(value[i], options);
            }
            return object;
        }
        else if (!options || !options.ignoreErrors) {
            throw new Error(`Cannot unserialize "${value}" to object.`);
        }
        else {
            return undefined;
        }
    }
}
//# sourceMappingURL=ObjectAsMapSerializer.js.map