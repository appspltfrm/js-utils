const awaits = [];
/**
 * Registers multiple promises for global tracking of asynchronous tasks.
 */
export function topLevelAwaits(...inputs) {
    for (const input of inputs) {
        topLevelAwait(input);
    }
}
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
export function topLevelAwait(input) {
    if (!awaits.includes(input)) {
        awaits.push(input);
    }
    let result;
    let error;
    const awaiter = input;
    awaiter.error = () => error;
    awaiter.value = () => result;
    const finish = () => {
        for (let i = 0; i < awaits.length; i++) {
            if (awaits[i] === input) {
                awaits.splice(i, 1);
                break;
            }
        }
    };
    input.then(v => {
        result = v;
        finish();
    }).catch(e => {
        error = e;
        finish();
    });
    return awaiter;
}
/**
 * Wait for all promises registered via `topLevelAwait` to settle.
 * This is typically used at the entry point of an application to ensure
 * all background initializations are complete.
 */
export async function waitTopLevelAwait() {
    await Promise.allSettled(awaits);
}
//# sourceMappingURL=topLevelAwait.js.map