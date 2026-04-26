/**
 * Returns a promise that resolves after a specified timeout.
 *
 * This is a utility for non-blocking delays in async functions.
 *
 * @param timeout The delay in milliseconds.
 * @returns A promise that resolves after the timeout.
 *
 * @example
 * ```typescript
 * await sleep(1000); // Wait for 1 second
 * ```
 */
export function sleep(timeout) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), timeout);
    });
}
//# sourceMappingURL=sleep.js.map