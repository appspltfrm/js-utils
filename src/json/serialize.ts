import {SerializationOptions} from "./SerializationOptions.js";
import {serializeImpl} from "./serializeImpl.js";

export function serialize(object: any, options?: SerializationOptions): any {
    return serializeImpl(object, null, options);
}
