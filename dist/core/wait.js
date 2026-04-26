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
export function waitTill(condition, interval = 100, timeout) {
    return new Promise((resolve, reject) => {
        let intervalId;
        let finished = false;
        let test = () => {
            try {
                const result = condition();
                if (!!result) {
                    if (intervalId) {
                        clearInterval(intervalId);
                    }
                    finished = true;
                    resolve(result);
                    return true;
                }
            }
            catch (error) {
                if (intervalId) {
                    clearInterval(intervalId);
                }
                finished = true;
                reject(error);
            }
            return false;
        };
        if (!test()) {
            intervalId = setInterval(test, interval === undefined || interval === null || interval < 0 ? 100 : interval);
            if (typeof timeout === "number" && timeout > 0) {
                setTimeout(() => {
                    if (!finished) {
                        if (intervalId) {
                            clearInterval(intervalId);
                        }
                        reject(new Error("Timeout of waitTill"));
                    }
                }, timeout);
            }
        }
    });
}
//# sourceMappingURL=wait.js.map