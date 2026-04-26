/**
 * Functional pipe utility that chains multiple functions together.
 *
 * It takes an initial value and a series of functions, applying each function
 * to the result of the previous one.
 *
 * @param arg The initial value to pass into the first function.
 * @param firstFn The first function to execute.
 * @param fns Subsequent functions to execute in order.
 * @returns The final result after all functions have been applied.
 *
 * @example
 * ```typescript
 * const add5 = (n: number) => n + 5;
 * const toString = (n: number) => n.toString();
 * const result = pipe(10, add5, toString); // "15"
 * ```
 */
export function pipe(arg, firstFn, ...fns) {
    return fns.reduce((acc, fn) => fn(acc), firstFn(arg));
}
//# sourceMappingURL=pipe.js.map