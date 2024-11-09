import { Serializer } from "../Serializer.js";
export class BooleanSerializer extends Serializer {
    serialize(value, options) {
        if (this.isUndefinedOrNull(value)) {
            return this.serializeUndefinedOrNull(value, options);
        }
        else if (typeof value === "boolean") {
            return value;
        }
        else if (options && options.notStrict) {
            return !!value;
        }
        else if (!options || !options.ignoreErrors) {
            throw new Error(`Cannot serialize "${value}" as boolean`);
        }
        else {
            return undefined;
        }
    }
    unserialize(value, options) {
        if (typeof value === "boolean") {
            return value;
        }
        else if (this.isUndefinedOrNull(value)) {
            return this.unserializeUndefinedOrNull(value, options);
        }
        else if (options && options.notStrict) {
            return !!value;
        }
        else if (!options || !options.ignoreErrors) {
            throw new Error(`Cannot unserialize "${value}" to boolean`);
        }
        else {
            return undefined;
        }
    }
}
(function (BooleanSerializer) {
    BooleanSerializer.instance = new BooleanSerializer();
})(BooleanSerializer || (BooleanSerializer = {}));
//# sourceMappingURL=BooleanSerializer.js.map