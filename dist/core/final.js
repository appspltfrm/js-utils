/**
 * A property decorator that makes a field "final" by preventing further
 * modifications after its initial assignment.
 *
 * It converts the property into a getter-only property. For non-static
 * fields, it waits for the first assignment before locking the value.
 *
 * @param target The prototype or constructor of the class.
 * @param propertyKey The name of the property.
 *
 * @example
 * ```typescript
 * class User {
 *   @final
 *   readonly id: string;
 *
 *   constructor(id: string) {
 *     this.id = id; // First assignment works
 *     // this.id = "new"; // Throws or fails silently depending on strict mode
 *   }
 * }
 * ```
 */
export function final(target, propertyKey) {
    const value = target[propertyKey];
    // if it currently has no value, then wait for the first setter-call
    // usually the case with non-static fields
    if (!value) {
        Object.defineProperty(target, propertyKey, {
            set: function (value) {
                Object.defineProperty(this, propertyKey, {
                    get: function () {
                        return value;
                    },
                    enumerable: true,
                    configurable: false
                });
            },
            enumerable: true,
            configurable: true
        });
    }
    else { // else, set it immediately
        Object.defineProperty(target, propertyKey, {
            get: function () {
                return value;
            },
            enumerable: true
        });
    }
}
//# sourceMappingURL=final.js.map