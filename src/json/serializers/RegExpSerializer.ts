import {SerializationOptions} from "../SerializationOptions.js";
import {Serializer} from "../Serializer.js";

export class RegExpSerializer extends Serializer {

    serialize(value: any, options?: SerializationOptions): any {
        if (this.isUndefinedOrNull(value)) {
            return this.serializeUndefinedOrNull(value, options);
        } else if (value instanceof RegExp) {
            return {"@type": "RegExp", pattern: value.source, flags: value.flags};
        } else if (!options || !options.ignoreErrors) {
            throw new Error(`Cannot serialize "${value}" as RegExp`);
        }
    }

    unserialize(value: any, options?: SerializationOptions): any {
        if (value instanceof RegExp) {
            return value;
        } else if (this.isUndefinedOrNull(value)) {
            return this.unserializeUndefinedOrNull(value, options);
        } else if (typeof value === "object" && typeof value.pattern === "string") {
            return new RegExp(value.pattern, value.flags);
        } else if (!options || !options.ignoreErrors) {
            throw new Error(`Cannot unserialize "${value}" to RegExp`);
        } else {
            return undefined;
        }
    }

}

export namespace RegExpSerializer {
    export const instance = new RegExpSerializer();
}
