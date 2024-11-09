import { clone, Clone } from "./clone.js";
/**
 * A date, that points to absolute date - no time, no time zone, just year-month-date.
 */
export declare class NoTimeDate extends Date implements Clone<NoTimeDate> {
    static readonly jsonTypeName = "NoTimeDate";
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
