import {Type} from "../core/Type.js";
import {SerializationOptions} from "./SerializationOptions.js";
import {unserializeImpl} from "./unserializeImpl.js";

export function unserialize(json: any, targetClass?: Type, options?: SerializationOptions) {

    if (json === undefined || json === null) {
        return json;
    }

    return unserializeImpl(json, targetClass, options);
}
