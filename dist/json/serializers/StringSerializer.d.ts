import { SerializationOptions } from "../SerializationOptions.js";
import { Serializer } from "../Serializer.js";
export declare class StringSerializer extends Serializer {
    serialize(value: any, options?: SerializationOptions): any;
    unserialize(value: any, options?: SerializationOptions): any;
}
export declare namespace StringSerializer {
    const instance: StringSerializer;
}
