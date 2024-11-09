"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = sleep;
/**
 * Do nothing but sleep millisec.
 */
function sleep(timeout) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), timeout);
    });
}
//# sourceMappingURL=sleep.js.map