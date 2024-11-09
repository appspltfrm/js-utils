import { clone } from "./clone.js";
/**
 * A date, that points date-time always in local time.
 * It means, that UTC date/time will be shown in every time zone.
 */
export class LocalDate extends Date {
    static jsonTypeName = "LocalDate";
    static fromJSON(json) {
        if (typeof json === "object" && json && json["date"]) {
            return new LocalDate(json["date"]);
        }
        else if (json instanceof Date || typeof json === "number" || typeof json === "string") {
            return new LocalDate(json);
        }
        else {
            throw new Error(`Cannot unserialize "${JSON.stringify(json)}" to LocalDate`);
        }
    }
    constructor(valueOrYear, month, date, hours, minutes, seconds, ms) {
        if (typeof month === "number") {
            super(Date.UTC(valueOrYear, month, date, hours, minutes, seconds, ms));
        }
        else if (typeof valueOrYear === "number" || typeof valueOrYear === "string" || valueOrYear instanceof Date) {
            super(valueOrYear);
        }
        else {
            super();
        }
    }
    getFullYear() {
        return super.getUTCFullYear();
    }
    getMonth() {
        return super.getUTCMonth();
    }
    getDate() {
        return super.getUTCDate();
    }
    getDay() {
        return super.getUTCDay();
    }
    getHours() {
        return super.getUTCHours();
    }
    getMinutes() {
        return super.getUTCMinutes();
    }
    getSeconds() {
        return super.getUTCSeconds();
    }
    getMilliseconds() {
        return super.getUTCMilliseconds();
    }
    getTimezoneOffset() {
        return 0;
    }
    setTime(time) {
        return super.setTime(time);
    }
    setMilliseconds(ms) {
        return super.setUTCMilliseconds(ms);
    }
    setSeconds(sec, ms) {
        return super.setUTCSeconds(sec, ms);
    }
    setMinutes(min, sec, ms) {
        return super.setUTCMinutes(min, sec, ms);
    }
    setHours(hours, min, sec, ms) {
        return super.setUTCHours(hours, min, sec, ms);
    }
    setDate(date) {
        return super.setUTCDate(date);
    }
    setMonth(month, date) {
        return super.setUTCMonth(month, date);
    }
    setFullYear(year, month, date) {
        return super.setUTCFullYear(year, month, date);
    }
    toDateString() {
        return new Intl.DateTimeFormat(undefined, {
            timeZone: "UTC",
            timeZoneName: undefined,
            hour: undefined,
            minute: undefined,
            second: undefined
        }).format(this);
    }
    toTimeString() {
        return new Intl.DateTimeFormat(undefined, {
            timeZone: "UTC",
            timeZoneName: undefined,
            year: undefined,
            month: undefined,
            day: undefined,
            weekday: undefined,
            era: undefined
        }).format(this);
    }
    [clone]() {
        return new LocalDate(this.getTime());
    }
    toString() {
        return new Intl.DateTimeFormat(undefined, { timeZone: "UTC", timeZoneName: undefined }).format(this);
    }
    toJSON() {
        return { "@type": LocalDate.jsonTypeName, date: super.toJSON() };
    }
}
//# sourceMappingURL=LocalDate.js.map