import { Type } from "../../core/Type.js";
import { SerializationOptions } from "../SerializationOptions.js";
import { Serializer } from "../Serializer.js";
import "reflect-metadata";
/**
 * Decorator defining property configuration for serialization.
 *
 * It allows specifying the explicit property type, its JSON name (if different from
 * the class property name), and additional serialization options.
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
export declare function property(type?: Type | Serializer): Function;
export declare function property(type: Type | Serializer, options?: SerializationOptions): Function;
export declare function property(type: Type | Serializer, jsonName?: string): Function;
export declare function property(type: Type | Serializer, jsonName: string, options?: SerializationOptions): Function;
export declare function property(jsonName?: string): Function;
export declare function property(jsonName: string, options?: SerializationOptions): Function;
