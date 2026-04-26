/**
 * Injects `toMillis()` and `toDate()` methods into the native `Date.prototype`.
 * This enables the use of `Timestamp` methods on all native `Date` instances.
 *
 * Called automatically when this module is imported.
 */
export function implementTimestampInDate() {
    // @ts-ignore
    if (Date.prototype.toMillis) {
        return;
    }
    Date.prototype.toMillis = function () {
        return this.getTime();
    };
    Date.prototype.toDate = function () {
        return new Date(this.getTime());
    };
}
// Automatically apply the extensions
implementTimestampInDate();
//# sourceMappingURL=Timestamp.js.map