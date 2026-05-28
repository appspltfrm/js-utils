import { Type } from "../core/Type.js";
import { FromJsonType } from "./FromJsonType.js";
import { SerializationOptions } from "./SerializationOptions.js";
import { Serializer } from "./Serializer.js";
import "reflect-metadata";
/**
 * Decorator defining property configuration for serialization.
 *
 * It allows specifying the explicit property type, its JSON name (if different from
 * the class property name), and additional serialization options. The type argument
 * may also be a class without a public constructor that exposes a static `fromJSON(...)`
 * method (see {@link FromJsonType}).
 *
 * @example
 * ```typescript
 * @serializable()
 * class User {
 *   @property(Address)
 *   address: Address;
 *
 *   @property("user_name")
 *   userName: string;
 * }
 * ```
 */
export declare function property(type?: Type | FromJsonType | Serializer): Function;
export declare function property(type: Type | FromJsonType | Serializer, options?: SerializationOptions): Function;
export declare function property(type: Type | FromJsonType | Serializer, jsonName?: string): Function;
export declare function property(type: Type | FromJsonType | Serializer, jsonName: string, options?: SerializationOptions): Function;
export declare function property(jsonName?: string): Function;
export declare function property(jsonName: string, options?: SerializationOptions): Function;
