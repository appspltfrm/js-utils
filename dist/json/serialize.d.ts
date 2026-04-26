import { SerializationOptions } from "./SerializationOptions.js";
/**
 * Serializes an object into a JSON-compatible format, preserving type information
 * for classes marked with `@serializable`.
 *
 * @param object The object or instance to serialize.
 * @param options Optional serialization settings.
 * @returns A plain JSON object or primitive.
 *
 * @example
 * ```typescript
 * const user = new User("Jan");
 * const json = serialize(user);
 * console.log(json["@type"]); // "User"
 * ```
 */
export declare function serialize(object: any, options?: SerializationOptions): any;
