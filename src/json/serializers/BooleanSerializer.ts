import {SerializationOptions} from "../SerializationOptions.js";
import {Serializer} from "../Serializer.js";

export class BooleanSerializer extends Serializer {

    serialize(value: any, options?: SerializationOptions): any {
        if (this.isUndefinedOrNull(value)) {
            return this.serializeUndefinedOrNull(value, options);
        } else if (typeof value === "boolean") {
            return value;
        } else if (options && options.notStrict) {
            return !!value;
        } else if (!options || !options.ignoreErrors) {
            throw new Error(`Cannot serialize "${value}" as boolean`);
        } else {
            return undefined;
        }
    }

    unserialize(value: any, options?: SerializationOptions): any {
        if (typeof value === "boolean") {
            return value;
        } else if (this.isUndefinedOrNull(value)) {
            return this.unserializeUndefinedOrNull(value, options);
        } else if (options && options.notStrict) {
            return !!value;
        } else if (!options || !options.ignoreErrors) {
            throw new Error(`Cannot unserialize "${value}" to boolean`);
        } else {
            return undefined;
        }
    }

}

export namespace BooleanSerializer {
    export const instance = new BooleanSerializer();
}
