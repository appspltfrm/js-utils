/**
 * An interface representing a timestamp that can be converted to
 * milliseconds or a native `Date` object.
 */
export interface Timestamp {
    /**
       * Returns the milliseconds since Unix epoch.
       */
    toMillis(): number;
    /**
       * Returns a native `Date` representation of the timestamp.
       */
    toDate(): Date;
}
declare global {
    /**
       * Extensions to the native `Date` class to implement the `Timestamp` interface.
       */
    interface Date extends Timestamp {
    }
}
/**
 * Injects `toMillis()` and `toDate()` methods into the native `Date.prototype`.
 * This enables the use of `Timestamp` methods on all native `Date` instances.
 *
 * Called automatically when this module is imported.
 */
export declare function implementTimestampInDate(): void;
