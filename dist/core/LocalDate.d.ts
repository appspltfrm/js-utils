import { clone, Clone } from "./clone.js";
/**
 * A date class that represents a date and time always interpreted in local time.
 *
 * This means that the UTC date/time values stored internally will be displayed
 * identically regardless of the system's local time zone. It effectively treats
 * the Date as if it were always in UTC but for "local" representation purposes.
 *
 * @example
 * ```typescript
 * const date = new LocalDate(2023, 0, 1, 12, 0); // Jan 1st, 2023, 12:00
 * console.log(date.getHours()); // Always 12, regardless of system timezone
 * ```
 */
export declare class LocalDate extends Date implements Clone<LocalDate> {
    static readonly jsonTypeName = "LocalDate";
    /**
       * Unserializes a JSON value into a LocalDate instance.
       * @param json The JSON value (object, string, number, or Date).
       * @returns A new LocalDate instance.
       */
    static fromJSON(json: any): LocalDate;
    constructor();
    constructor(value: number | string | Date);
    constructor(year: number, month: number, date?: number, hours?: number, minutes?: number, seconds?: number, ms?: number);
    getFullYear(): number;
    getMonth(): number;
    getDate(): number;
    getDay(): number;
    getHours(): number;
    getMinutes(): number;
    getSeconds(): number;
    getMilliseconds(): number;
    getTimezoneOffset(): number;
    setTime(time: number): number;
    setMilliseconds(ms: number): number;
    setSeconds(sec: number, ms?: number): number;
    setMinutes(min: number, sec?: number, ms?: number): number;
    setHours(hours: number, min?: number, sec?: number, ms?: number): number;
    setDate(date: number): number;
    setMonth(month: number, date?: number): number;
    setFullYear(year: number, month?: number, date?: number): number;
    toDateString(): string;
    toTimeString(): string;
    [clone](): LocalDate;
    toString(): string;
    toJSON(): any;
}
