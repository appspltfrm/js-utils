import { clone, Clone } from "./clone.js";
/**
 * A type representing a time zone identifier.
 * Can be a standard IANA time zone name (e.g., "Europe/Warsaw"),
 * "current" for the system's local time zone, or undefined/null.
 */
type TimeZone = string | "current" | undefined | null;
/**
 * A date class that represents a specific point in time associated with a specific time zone.
 *
 * This class extends the native `Date` but keeps track of an intended time zone
 * for formatting and display purposes.
 *
 * @example
 * ```typescript
 * const date = new TimeZoneDate(Date.now(), "America/New_York");
 * console.log(date.toString()); // Displays time in New York timezone
 * ```
 */
export declare class TimeZoneDate extends Date implements Clone<TimeZoneDate> {
    static readonly jsonTypeName = "TimeZoneDate";
    /**
       * Unserializes a JSON value into a TimeZoneDate instance.
       * @param json The JSON value (object, Date, or number).
       * @returns A new TimeZoneDate instance.
       */
    static fromJSON(json: any): TimeZoneDate | undefined;
    constructor();
    constructor(epoch: number, timeZone?: TimeZone);
    constructor(date: Date, timeZone?: TimeZone);
    constructor(isoDateString: string, timeZone?: TimeZone);
    /**
       * The time zone associated with this date instance.
       */
    timeZone: TimeZone;
    [clone](): TimeZoneDate;
    /**
       * Returns a string representation of the date formatted for the associated time zone.
       */
    toString(): string;
    /**
       * Converts the TimeZoneDate instance to a JSON-serializable object.
       */
    toJSON(): any;
}
export {};
