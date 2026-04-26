/**
 * Base class for custom property serializers.
 *
 * You can extend this class to provide custom logic for serializing and
 * unserializing specific property types that are not handled by the default
 * serializers (like Date, Set, Map, etc.).
 *
 * @example
 * ```typescript
 * class MyCustomSerializer extends Serializer<MyType> {
 *   serialize(object: MyType) { return object.toString(); }
 *   unserialize(json: string) { return new MyType(json); }
 * }
 * ```
 */
export class Serializer {
    /**
       * Converts a class property value into a JSON-serializable format.
       */
    serialize(object, options) {
        return object;
    }
    /**
       * Helper to check if a value is undefined or null.
       */
    isUndefinedOrNull(value) {
        return value === undefined || value === null;
    }
    /**
       * Default handling for serializing undefined or null values.
       */
    serializeUndefinedOrNull(value, options) {
        return value;
    }
    /**
       * Default handling for unserializing undefined or null values.
       * @throws Error if `disallowUndefinedOrNull` option is set.
       */
    unserializeUndefinedOrNull(value, options) {
        if (options && options.disallowUndefinedOrNull) {
            throw new Error("Undefined/null value is not allowed");
        }
        else {
            return value;
        }
    }
}
//# sourceMappingURL=Serializer.js.map