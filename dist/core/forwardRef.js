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
export function forwardRef(forwardRefFn) {
    forwardRefFn.__forward_ref__ = forwardRef;
    forwardRefFn.toString = function () {
        return JSON.stringify(this());
    };
    return forwardRefFn;
}
//# sourceMappingURL=forwardRef.js.map