import {Type} from "../../core/Type.js";
import {InternalType} from "../InternalType.js";
import {setupSerialization} from "../setupSerialization.js";
import {SubtypeMatcher} from "../SubtypeMatcher.js";

type Fn = (classType: Type) => void;

/**
 * Decorator that supports polymorphism during unserialization.
 *
 * It allows linking a subclass to a base class based on a condition (matcher or
 * a property/value pair). When the unserializer encounters the base class but
 * the JSON data matches the condition, it will instantiate the correct subclass instead.
 *
 * @example
 * ```typescript
 * @serializable()
 * abstract class Animal { name: string; }
 *
 * @subtype(Animal, "type", "cat")
 * class Cat extends Animal { meow() {} }
 *
 * @subtype(Animal, "type", "dog")
 * class Dog extends Animal { bark() {} }
 * ```
 */
export function subtype(supertype: Type, matcher: SubtypeMatcher): Fn;

export function subtype(supertype: Type, property: string, value: any): Fn;

/**
 * Decorator that supports polymorphism during unserialization.
 * Handles various overloads to provide a flexible API.
 */
export function subtype(supertype: Type, propertyOrMatcher: string | SubtypeMatcher, value?: any): Fn {
  return function (classType: Type) {
    setupSerialization(supertype);

    const internalType = supertype as InternalType;

    const types = internalType.__jsonSubtypes = (internalType.hasOwnProperty("__jsonSubtypes") && internalType.__jsonSubtypes) || [];

    types.push({
      type: classType,
      property: typeof propertyOrMatcher === "string" ? propertyOrMatcher : undefined,
      value: value,
      matcher: typeof propertyOrMatcher === "function" ? propertyOrMatcher : undefined
    });
  }
}
