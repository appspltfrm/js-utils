/**
 * Do nothing but sleep millisec.
 */
export function sleep(timeout) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), timeout);
    });
}
//# sourceMappingURL=sleep.js.map