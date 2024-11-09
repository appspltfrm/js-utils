import {SerializationOptions} from "../SerializationOptions.js";
import {Serializer} from "../Serializer.js";

export class NumberSerializer extends Serializer {

    serialize(value: any, options?: SerializationOptions): any {
        if (this.isUndefinedOrNull(value)) {
            return this.serializeUndefinedOrNull(value, options);
        } else if (typeof value === "number") {
            return value;
        } else if (options && options.notStrict && typeof value === "string") {
            return parseFloat(value);
        } else if (!options || !options.ignoreErrors) {
            throw new Error(`Cannot serialize "${value}" as number`);
        } else {
            return undefined;
        }
    }

    unserialize(value: any, options?: SerializationOptions): any {
        if (typeof value === "number") {
            return value;
        } else if (this.isUndefinedOrNull(value)) {
            return this.unserializeUndefinedOrNull(value, options);
        } else if (options && options.notStrict) {
            return parseFloat(value);
        } else if (!options || !options.ignoreErrors) {
            throw new Error(`Cannot unserialize "${value}" to number`);
        } else {
            return undefined;
        }
    }

}

export namespace NumberSerializer {
    export const instance = new NumberSerializer();
}
