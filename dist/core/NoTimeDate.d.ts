import { clone, Clone } from "./clone.js";
/**
 * A date class that represents a date without a time component.
 *
 * All time-related operations (hours, minutes, seconds, milliseconds) are
 * effectively ignored or always reset to zero. This is useful for representing
 * business dates like "2023-01-01" without worrying about timezone-induced shifts.
 *
 * Internally, it uses UTC at midnight to ensure consistency.
 *
 * @example
 * ```typescript
 * const date = new NoTimeDate(2023, 0, 1); // Jan 1st, 2023
 * console.log(date.getHours()); // Always 0
 * ```
 */
export declare class NoTimeDate extends Date implements Clone<NoTimeDate> {
    static readonly jsonTypeName = "NoTimeDate";
    /**
       * Unserializes a JSON value into a NoTimeDate instance.
       * @param json The JSON value (object, string, number, or Date).
       * @returns A new NoTimeDate instance.
       */
    static fromJSON(json: any): NoTimeDate;
    constructor();
    constructor(value: number | string | Date);
    constructor(year: number, month: number, date: number);
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
    getUTCHours(): number;
    getUTCMinutes(): number;
    getUTCSeconds(): number;
    getUTCMilliseconds(): number;
    setUTCMilliseconds(ms: number): number;
    setUTCSeconds(sec: number, ms?: number): number;
    setUTCMinutes(min: number, sec?: number, ms?: number): number;
    setUTCHours(hours: number, min?: number, sec?: number, ms?: number): number;
    setDate(date: number): number;
    setMonth(month: number, date?: number): number;
    setFullYear(year: number, month?: number, date?: number): number;
    toDateString(): string;
    toTimeString(): string;
    [clone](): NoTimeDate;
    toString(): string;
    toJSON(): any;
}
