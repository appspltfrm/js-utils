import { timeZoneOffset } from "./timeZoneOffset.js";
/**
 * Represents a date with an associated time zone.
 *
 * @deprecated Use {@link TimeZoneDate} instead, as it provides a cleaner
 * inheritance from the native `Date` class and better integration with
 * the rest of the library.
 */
export class DateTimezone {
    /**
       * Calculates the offset for a specific timezone and date in minutes.
       * @param timezone The IANA timezone name.
       * @param date The date to calculate the offset for.
       */
    static timezoneOffset(timezone, date) {
        return timeZoneOffset(timezone, date) / 1000 / 60;
    }
    /**
       * Unserializes a JSON value into a DateTimezone instance.
       */
    static fromJSON(json) {
        if (typeof json === "object" && json && json["timezone"] && json["date"]) {
            return new DateTimezone(json["date"], json["timezone"]);
        }
        else if (json instanceof Date) {
            return new DateTimezone(json);
        }
        else if (typeof json === "number") {
            return new DateTimezone(json);
        }
    }
    /**
       * Creates a new DateTimezone instance.
       */
    constructor(dateOrEpoch, timezone) {
        this.timezone = timezone;
        if (typeof dateOrEpoch === "number") {
            this.date = new Date(dateOrEpoch);
        }
        else {
            this.date = new Date(dateOrEpoch.getTime());
        }
    }
    /**
       * The underlying Date instance.
       */
    date;
    /**
       * The time zone associated with this instance.
       */
    timezone;
    /**
       * Returns the milliseconds since epoch.
       */
    epoch() {
        return this.date.valueOf();
    }
    /**
       * Converts the instance to a JSON-serializable object.
       */
    toJSON() {
        return { "@type": "DateTimezone", date: this.date.getTime(), timezone: this.timezone };
    }
}
//# sourceMappingURL=DateTimezone.js.map