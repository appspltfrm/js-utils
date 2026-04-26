/**
 * Lazily retrieves the actual reference from a `forwardRef`.
 *
 * If the provided value is a `forwardRef`, it executes the wrapped function
 * and returns the result. Otherwise, it returns the value itself (identity function).
 *
 * @param type The value to resolve.
 * @returns The resolved reference or the original value.
 *
 * @example
 * ```typescript
 * const ref = forwardRef(() => User);
 * const resolved = resolveForwardRef(ref); // User class
 * ```
 */
export function resolveForwardRef(type) {
    if (typeof type === "function" && type.hasOwnProperty("__forward_ref__") && typeof type.__forward_ref__ === "function") {
        return type();
    }
    else {
        return type;
    }
}
//# sourceMappingURL=resolveForwardRef.js.map