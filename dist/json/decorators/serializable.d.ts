import { Type } from "../../core/Type.js";
import { JsonTypeName } from "../JsonTypeName.js";
import { TypeProvider } from "../TypeProvider.js";
import { PropertyConfig } from "./PropertyConfig.js";
/**
 * Decorator that marks a class as serializable.
 *
 * It allows preserving the class type information during JSON conversion,
 * enabling full reconstruction of instances including methods and hierarchy.
 *
 * If the project uses `TsTransformer`, property metadata is injected automatically.
 * Otherwise, properties must be manually defined in the `options`.
 *
 * @param options Optional serialization configuration.
 *
 * @example
 * ```typescript
 * @serializable()
 * class User {
 *   name: string;
 * }
 * ```
 */
export declare function serializable(options?: JsonSerializableOptions): (classType: Type) => void;
type Types = Array<TypeProvider | TypeProvider[] | (Type & JsonTypeName) | Types>;
type Properties = {
    [propertyName: string]: PropertyConfig;
};
/**
 * Options for the `@serializable` decorator.
 */
export interface JsonSerializableOptions {
    /**
       * Additional type providers or explicit types used within the class.
       */
    types?: Types;
    /**
       * Explicit property configuration or "*" to include all properties.
       */
    properties?: Properties | "*";
}
export {};
