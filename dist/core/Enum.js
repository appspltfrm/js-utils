/**
 * An advanced base class for enumerated types in TypeScript.
 *
 * Unlike standard TypeScript enums, these are full-fledged objects, allowing for
 * better type safety, methods, and seamless JSON serialization.
 *
 * @example
 * ```typescript
 * class UserRole extends Enum {
 *   static readonly ADMIN = new UserRole("ADMIN");
 *   static readonly USER = new UserRole("USER");
 * }
 *
 * const role = UserRole.valueOf("ADMIN");
 * console.log(role === UserRole.ADMIN); // true
 * ```
 */
export class Enum {
    name;
    /**
       * Returns a list of all registered values for this enum class.
       * This method is protected and should be exposed via a public static method in subclasses.
       */
    static values() {
        return valuesRef(this).slice();
    }
    /**
       * Creates an enum instance from a JSON value (either a string or an object with a `name` property).
       * This method is protected and should be exposed via a public static method in subclasses.
       *
       * @param value The JSON value to parse.
       * @param unknownFactory Optional factory function to handle unknown values.
       * @returns The matching enum instance.
       * @throws Error if the value is invalid and no unknownFactory is provided.
       */
    static fromJSON(value, unknownFactory) {
        let name;
        if (typeof value === "string") {
            name = value;
        }
        else if (typeof value === "object" && typeof value?.name === "string") {
            name = value.name;
        }
        if (name) {
            for (const v of valuesRef(this)) {
                if (v.name === name) {
                    return v;
                }
            }
        }
        if (unknownFactory) {
            return unknownFactory(value);
        }
        throw new Error("Invalid value " + JSON.stringify(value) + " for enum " + jsonTypeName(this));
    }
    /**
       * Returns an enum instance by its name.
       * This method is protected and should be exposed via a public static method in subclasses.
       *
       * @param name The name of the enum value (string or JSON object).
       * @param unknownFactory Optional factory function to handle unknown names.
       * @returns The matching enum instance.
       * @throws Error if the name is invalid and no unknownFactory is provided.
       */
    static valueOf(name, unknownFactory) {
        CHECK_NAME: if (name) {
            if (typeof name === "object" && name) {
                if (name["@type"] === jsonTypeName(this)) {
                    name = name.name;
                }
                else {
                    break CHECK_NAME;
                }
            }
            for (const v of valuesRef(this)) {
                if (v.name === name) {
                    return v;
                }
            }
        }
        if (unknownFactory) {
            return unknownFactory(name);
        }
        throw new Error("Invalid value " + JSON.stringify(name) + " for enum " + this.name);
    }
    /**
       * Creates a new enum constant.
       * @param name The unique name of the enum constant.
       */
    constructor(name) {
        this.name = name;
        addValue(this.constructor, this);
    }
    /**
       * Compares the current enum value with another value.
       * Supports comparison with strings (names), other Enum instances, or JSON representations.
       *
       * @param value The value to compare against.
       * @returns `true` if values match, `false` otherwise.
       */
    equals(value) {
        if (value === null || value === undefined || typeof value === "function" || typeof value === "number" || typeof value === "boolean") {
            return false;
        }
        if (typeof value === "string") {
            return value === this.name;
        }
        else if ("@type" in value) {
            return value["@type"] === jsonTypeName(this) && value.name === this.name;
        }
        else if (value.constructor === this.constructor) {
            return value.name === this.name;
        }
        return false;
    }
    /**
       * Converts the enum instance to a JSON-serializable object.
       */
    toJSON() {
        return { "@type": jsonTypeName(this), name: this.name };
    }
}
function addValue(enumClass, value) {
    valuesRef(enumClass).push(value);
}
const enumValuesProp = Symbol("@appspltfrm/js-utils/core/Enum:values");
function valuesRef(enumClass) {
    const cl = enumClass;
    if (!cl[enumValuesProp]) {
        cl[enumValuesProp] = [];
    }
    return cl[enumValuesProp];
}
function jsonTypeName(instanceOrClass) {
    let type;
    if (instanceOrClass instanceof Enum) {
        type = instanceOrClass.constructor;
    }
    else {
        type = instanceOrClass;
    }
    return type.jsonTypeName || type.name;
}
//# sourceMappingURL=Enum.js.map