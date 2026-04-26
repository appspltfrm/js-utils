import { Type } from "./Type.js";
/**
 * An interface for functions passed into `forwardRef`.
 */
export interface ForwardRefFn {
    (): any;
}
/**
 * Allows to refer to references that are not yet defined.
 *
 * This is useful in scenarios like Dependency Injection or class decorators
 * where two classes refer to each other (circular dependency).
 *
 * @param forwardRefFn A function that returns the reference when called.
 * @returns A token that can be resolved later.
 *
 * @example
 * ```typescript
 * @serializable({
 *   properties: {
 *     owner: { propertyType: forwardRef(() => User) }
 *   }
 * })
 * class Order { owner: User; }
 * ```
 */
export declare function forwardRef(forwardRefFn: ForwardRefFn): Type<any>;
