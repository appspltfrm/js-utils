import { SerializationOptions } from "./SerializationOptions.js";
export declare abstract class Serializer<T = any> {
    serialize(object: any, options?: SerializationOptions): any;
    abstract unserialize(json: any, options?: SerializationOptions): T;
    protected isUndefinedOrNull(value: any): boolean;
    protected serializeUndefinedOrNull(value: any, options?: SerializationOptions): any;
    protected unserializeUndefinedOrNull(value: any, options?: SerializationOptions): any;
}
