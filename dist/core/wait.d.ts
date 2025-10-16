/**
 * Check condition async and re-check every 100ms (or other interval) till it return truly value (!!).
 * If condition throws error, the promise will be rejected.
 */
export declare function waitTill<O>(condition: () => O, interval?: number, timeout?: number): Promise<O>;
