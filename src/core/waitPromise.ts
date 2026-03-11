export type WaitPromiseOptions = {
    timeout?: number;
    timeoutError?: () => Error;
}

export function waitPromise<T>(promiseOrFn: Promise<T> | (() => Promise<T>), options?: WaitPromiseOptions): Promise<T> {
    return new Promise((resolve, reject) => {
        let finito = false;

        const promise = typeof promiseOrFn === "function" ? promiseOrFn() : promiseOrFn;
        promise.then(r => {
            finito = true;
            resolve(r)
        }).catch(e => {
            finito = true;
            reject(e)
        });

        if (options?.timeout && !finito) {
            setTimeout(() => !finito && reject(options.timeoutError?.() ?? new Error("Promise timeout")), options.timeout);
        }
    })
}
