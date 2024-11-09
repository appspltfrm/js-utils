import {Type} from "../../core/Type.js";
import {SerializationOptions} from "../SerializationOptions.js";
import {Serializer} from "../Serializer.js";
import {ObjectSerializer} from "./ObjectSerializer.js";

/**
 * Serializer of objects, that should be treated as Maps, where key is always a string and value of given type.
 */
export class ObjectAsMapSerializer extends Serializer {

    constructor(valueTypeOrSerializer?: Type | Serializer) {
        super();
        this.typeOrSerializer = valueTypeOrSerializer;
    }

    private readonly typeOrSerializer: Type | Serializer;

    serialize(value: any, options?: SerializationOptions): any {

        if (this.isUndefinedOrNull(value)) {
            return this.serializeUndefinedOrNull(value, options);

        } else if (typeof value === "object") {

            const serializer = this.typeOrSerializer instanceof Serializer ? this.typeOrSerializer : (this.typeOrSerializer && ObjectSerializer.getTypeSerializer(this.typeOrSerializer, options?.typeProviders)) || ObjectSerializer.instance;
            const json = {};

            for (const i in value) {
                json[i] = serializer.serialize(value[i], options);
            }

            return json;

        } else if (!options || !options.ignoreErrors) {
            throw new Error(`Cannot serialize "${value}" as object`);

        } else {
            return undefined;
        }
    }

    unserialize(value: any, options?: SerializationOptions): any {

        if (this.isUndefinedOrNull(value)) {
            return this.unserializeUndefinedOrNull(value, options);

        } else if (typeof value === "object") {

            const serializer = this.typeOrSerializer instanceof Serializer ? this.typeOrSerializer : (this.typeOrSerializer && ObjectSerializer.getTypeSerializer(this.typeOrSerializer, options?.typeProviders)) || ObjectSerializer.instance;
            const object = {};

            for (const i in value) {
                object[i] = serializer.unserialize(value[i], options);
            }

            return object;

        } else if (!options || !options.ignoreErrors) {
            throw new Error(`Cannot unserialize "${value}" to object.`);

        } else {
            return undefined;
        }
    }
}
