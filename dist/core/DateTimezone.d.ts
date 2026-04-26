/**
 * Represents a date with an associated time zone.
 *
 * @deprecated Use {@link TimeZoneDate} instead, as it provides a cleaner
 * inheritance from the native `Date` class and better integration with
 * the rest of the library.
 */
export declare class DateTimezone {
    /**
       * Calculates the offset for a specific timezone and date in minutes.
       * @param timezone The IANA timezone name.
       * @param date The date to calculate the offset for.
       */
    static timezoneOffset(timezone: string, date?: Date): number;
    /**
       * Unserializes a JSON value into a DateTimezone instance.
       */
    static fromJSON(json: any): DateTimezone | undefined;
    constructor(epoch: number, timezone?: string);
    constructor(date: Date, timezone?: string);
    /**
       * The underlying Date instance.
       */
    readonly date: Date;
    /**
       * The time zone associated with this instance.
       */
    readonly timezone: string | undefined;
    /**
       * Returns the milliseconds since epoch.
       */
    epoch(): number;
    /**
       * Converts the instance to a JSON-serializable object.
       */
    toJSON(): {
        "@type": string;
        date: number;
        timezone: string | undefined;
    };
}
