import { Type } from "../../core/Type.js";
import { SerializationOptions } from "../SerializationOptions.js";
import { Serializer } from "../Serializer.js";
import { TypeProvider } from "../TypeProvider.js";
/**
 * Basic serializer.
 */
export declare class ObjectSerializer extends Serializer {
    constructor(type?: Type);
    private readonly type?;
    serialize(object: any, options?: SerializationOptions): any;
    unserialize(json: any, options?: SerializationOptions): any;
}
export declare namespace ObjectSerializer {
    const instance: ObjectSerializer;
    function getTypeSerializer(type: Type, typeProviders?: TypeProvider[]): Serializer<any>;
}
