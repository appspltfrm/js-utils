import { SerializationOptions } from "../SerializationOptions.js";
import { Serializer } from "../Serializer.js";
/**
 * Serializer for Date type.
 * Date is serialized to typed json: {"@type": "Date", value: Date.toISOString}.
 * Date can be unserialized from ISO string, timestamp number, Date instance of typed json.
 */
export declare class DateSerializer extends Serializer {
    serialize(value: any, options?: SerializationOptions): any;
    unserialize(value: any, options?: SerializationOptions): any;
}
export declare namespace DateSerializer {
    const instance: DateSerializer;
}
