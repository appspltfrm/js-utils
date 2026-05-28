import {Type} from "../core/Type.js";
import {FromJsonType} from "./FromJsonType.js";
import {InternalType} from "./_InternalType.js";
import {SerializationOptions} from "./SerializationOptions.js";
import {Serializer} from "./Serializer.js";
import {_setupSerialization} from "./_setupSerialization.js";
import {PropertyConfig} from "./PropertyConfig.js";
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
export function property(type?: Type | FromJsonType | Serializer): Function;

export function property(type: Type | FromJsonType | Serializer, options?: SerializationOptions): Function;

export function property(type: Type | FromJsonType | Serializer, jsonName?: string): Function;

export function property(type: Type | FromJsonType | Serializer, jsonName: string, options?: SerializationOptions): Function;

export function property(jsonName?: string): Function;

export function property(jsonName: string, options?: SerializationOptions): Function;

/**
 * Decorator defining property configuration for serialization.
 * Handles various overloads to provide a flexible API.
 */
export function property(): Function {

  let jsonType: Type | Serializer;
  let jsonName: string;
  let options: SerializationOptions;

  for (let i = 0; i < arguments.length; i++) {

    if (arguments[i] instanceof Serializer || typeof arguments[i] === "function") {
      jsonType = arguments[i];
    } else if (typeof arguments[i] === "string") {
      jsonName = arguments[i];
    } else if (arguments[i] && typeof arguments[i] === "object") {
      options = arguments[i];
    }
  }

  return function (classPrototype: any, propertyName: string, propertyDescriptor?: PropertyDescriptor) {

    const type = classPrototype.constructor as InternalType;
    const config = Object.assign({
      propertyType: jsonType,
      propertyDesignType: !jsonType ? Reflect.getMetadata("design:type", classPrototype, propertyName) : undefined,
      propertyJsonName: jsonName
    }, options) as PropertyConfig;

    _setupSerialization(type);

    const properties = type.__jsonProperties = (type.hasOwnProperty("__jsonProperties") && type.__jsonProperties) || {};
    properties[propertyName] = config;
  }
}
