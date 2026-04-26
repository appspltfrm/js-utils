import { Type } from "../../core/Type.js";
import { SubtypeMatcher } from "../SubtypeMatcher.js";
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
export declare function subtype(supertype: Type): Fn;
export declare function subtype(supertype: Type, matcher: SubtypeMatcher): Fn;
export declare function subtype(supertype: Type, property: string, value: any): Fn;
export {};
