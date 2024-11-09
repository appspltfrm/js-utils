import { Enum } from "../../core/Enum.js";
import { Serializer } from "../Serializer.js";
/**
 * Serializes enum as a string. By default native enums are serialized as numbers, @{link Enum} is serialized to types json.
 */
export class EnumAsStringSerializer extends Serializer {
    constructor(enumClass) {
        super();
        this.enumClass = enumClass;
    }
    enumClass;
    serialize(value, options) {
        if (!this.isUndefinedOrNull(value)) {
            if (value instanceof Enum) {
                return value.name;
            }
            return this.enumClass[value];
        }
        else {
            return value;
        }
    }
    unserialize(value, options) {
        if (value && this.enumClass.fromJSON) {
            return this.enumClass.fromJSON(value);
        }
        else if (value && typeof value === "string") {
            return this.enumClass[value];
        }
        else {
            return value;
        }
    }
}
//# sourceMappingURL=EnumAsStringSerializer.js.map