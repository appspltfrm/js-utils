import { Serializer } from "../Serializer.js";
export class StringSerializer extends Serializer {
    serialize(value, options) {
        if (this.isUndefinedOrNull(value)) {
            return this.serializeUndefinedOrNull(value, options);
        }
        else if (typeof value === "string") {
            return value;
        }
        else if (options && options.notStrict) {
            return value + "";
        }
        else if (!options || !options.ignoreErrors) {
            throw new Error(`Cannot serialize "${value}" as string`);
        }
        else {
            return undefined;
        }
    }
    unserialize(value, options) {
        if (typeof value === "string") {
            return value;
        }
        else if (this.isUndefinedOrNull(value)) {
            return this.unserializeUndefinedOrNull(value, options);
        }
        else if (options && options.notStrict) {
            return value + "";
        }
        else if (!options || !options.ignoreErrors) {
            throw new Error(`Cannot unserialize "${value}" to string`);
        }
        else {
            return undefined;
        }
    }
}
(function (StringSerializer) {
    StringSerializer.instance = new StringSerializer;
})(StringSerializer || (StringSerializer = {}));
//# sourceMappingURL=StringSerializer.js.map