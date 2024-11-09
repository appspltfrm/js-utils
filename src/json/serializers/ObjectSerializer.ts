import {Type} from "../../core/Type.js";
import {findTypeSerializer} from "../findTypeSerializer.js";
import {SerializationOptions} from "../SerializationOptions.js";
import {serializeImpl} from "../serializeImpl.js";
import {Serializer} from "../Serializer.js";
import {TypeProvider} from "../TypeProvider.js";
import {unserializeImpl} from "../unserializeImpl.js";

/**
 * Basic serializer.
 */
export class ObjectSerializer extends Serializer {

    constructor(type?: Type) {
        super();

        if (type && type !== Object && type !== Array) {
            this.type = type;
        }
    }

    private readonly type?: Type;

    serialize(object: any, options?: SerializationOptions): any {
        return serializeImpl(object, this.type, options);
    }

    unserialize(json: any, options?: SerializationOptions): any {
        return unserializeImpl(json, this.type, options);
    }
}

export namespace ObjectSerializer {
    export const instance = new ObjectSerializer();

    export function getTypeSerializer(type: Type, typeProviders?: TypeProvider[]) {
        const serializer = findTypeSerializer(type, typeProviders);
        if (serializer) {
            return serializer;
        } else {
            return new ObjectSerializer(type);
        }
    }
}
