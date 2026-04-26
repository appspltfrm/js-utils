/**
 * A property decorator that sets the `enumerable` property of the descriptor.
 *
 * This can be used to hide properties from `for...in` loops and `Object.keys()`,
 * which is often useful for internal class state or methods.
 *
 * @param isEnumerable Whether the property should be enumerable.
 *
 * @example
 * ```typescript
 * class MyClass {
 *   @Enumerable(false)
 *   private internalState = "secret";
 * }
 * ```
 */
export function Enumerable(isEnumerable) {
    return (target, propertyKey, descriptor) => {
        descriptor.enumerable = isEnumerable;
        return descriptor;
    };
}
//# sourceMappingURL=Enumerable.js.map