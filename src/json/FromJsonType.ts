import {SerializationOptions} from "./SerializationOptions.js";

/**
 * Represents a class that can be reconstructed from JSON via a static `fromJSON(...)` method.
 *
 * Useful for classes without a public constructor (e.g. value objects with a private constructor
 * and a static factory) — the serializer calls `Type.fromJSON(json, options)` directly instead
 * of `new Type(...)`.
 */
export interface FromJsonType<T = any> {
  readonly prototype: T;
  fromJSON(json: any, options?: SerializationOptions): T;
}
