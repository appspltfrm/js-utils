import { clone, Clone } from "./clone.js";
/**
 * A date, that points date-time always in local time.
 * It means, that UTC date/time will be shown in every time zone.
 */
export declare class LocalDate extends Date implements Clone<LocalDate> {
    static readonly jsonTypeName = "LocalDate";
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
