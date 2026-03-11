export type WaitPromiseOptions = {
    timeout?: number;
    timeoutError?: () => Error;
};
export declare function waitPromise<T>(promiseOrFn: Promise<T> | (() => Promise<T>), options?: WaitPromiseOptions): Promise<T>;
