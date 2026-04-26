/**
 * Registers multiple promises for global tracking of asynchronous tasks.
 */
export declare function topLevelAwaits(...inputs: Promise<any>[]): void;
/**
 * Registers a promise for global tracking and returns an "awaiter" object
 * that can be used to check its current status (value or error) without `await`.
 *
 * This is useful in legacy environments or specific initialization patterns
 * where you want to start a task and wait for it globally later.
 *
 * @param input The promise to track.
 * @returns The original promise augmented with `value()` and `error()` methods.
 */
export declare function topLevelAwait<T>(input: Promise<T>): TopLevelAwaiter<T>;
/**
 * Wait for all promises registered via `topLevelAwait` to settle.
 * This is typically used at the entry point of an application to ensure
 * all background initializations are complete.
 */
export declare function waitTopLevelAwait(): Promise<void>;
/**
 * A promise augmented with status-checking methods.
 */
export type TopLevelAwaiter<T> = Promise<T> & {
    /**
       * Returns the error if the promise was rejected, otherwise undefined.
       */
    error?: () => any;
    /**
       * Returns the resolved value if the promise was fulfilled, otherwise undefined.
       */
    value: () => T | undefined;
};
