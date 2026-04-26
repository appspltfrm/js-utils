/**
 * Periodically checks a condition asynchronously until it becomes truthy.
 *
 * If the condition throws an error, the promise is immediately rejected.
 *
 * @param condition A function that returns a value to be tested for truthiness.
 * @param interval The polling interval in milliseconds (defaults to 100ms).
 * @param timeout Optional maximum time to wait in milliseconds.
 * @returns A promise that resolves with the first truthy value returned by the condition.
 * @throws Error if the timeout is reached or the condition throws.
 *
 * @example
 * ```typescript
 * const element = await waitTill(() => document.querySelector("#my-id"), 50, 2000);
 * ```
 */
export declare function waitTill<O>(condition: () => O, interval?: number, timeout?: number): Promise<O>;
