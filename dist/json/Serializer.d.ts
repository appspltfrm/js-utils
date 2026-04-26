import { SerializationOptions } from "./SerializationOptions.js";
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
export declare abstract class Serializer<T = any> {
    /**
       * Converts a class property value into a JSON-serializable format.
       */
    serialize(object: any, options?: SerializationOptions): any;
    /**
       * Converts a JSON value back into a class property value.
       */
    abstract unserialize(json: any, options?: SerializationOptions): T;
    /**
       * Helper to check if a value is undefined or null.
       */
    protected isUndefinedOrNull(value: any): boolean;
    /**
       * Default handling for serializing undefined or null values.
       */
    protected serializeUndefinedOrNull(value: any, options?: SerializationOptions): any;
    /**
       * Default handling for unserializing undefined or null values.
       * @throws Error if `disallowUndefinedOrNull` option is set.
       */
    protected unserializeUndefinedOrNull(value: any, options?: SerializationOptions): any;
}
