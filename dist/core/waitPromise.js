/**
 * Wraps a promise or an async function with a timeout.
 *
 * If the original promise does not resolve within the specified timeout,
 * the returned promise is rejected with a timeout error.
 *
 * @param promiseOrFn The promise or an async function returning a promise.
 * @param options Timeout settings.
 * @returns A promise that resolves with the original result or rejects on timeout.
 *
 * @example
 * ```typescript
 * const data = await waitPromise(fetchData(), { timeout: 5000 });
 * ```
 */
export function waitPromise(promiseOrFn, options) {
    return new Promise((resolve, reject) => {
        let finito = false;
        const promise = typeof promiseOrFn === "function" ? promiseOrFn() : promiseOrFn;
        promise.then(r => {
            finito = true;
            resolve(r);
        }).catch(e => {
            finito = true;
            reject(e);
        });
        if (options?.timeout && !finito) {
            setTimeout(() => !finito && reject(options.timeoutError?.() ?? new Error("Promise timeout")), options.timeout);
        }
    });
}
//# sourceMappingURL=waitPromise.js.map