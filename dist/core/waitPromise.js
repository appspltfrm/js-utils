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