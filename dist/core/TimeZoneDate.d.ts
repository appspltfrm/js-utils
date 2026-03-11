import { clone, Clone } from "./clone.js";
type TimeZone = string | "current" | undefined | null;
/**
 * Klasa reprezentująca datę z przypisaną konkretną strefą czasową.
 */
export declare class TimeZoneDate extends Date implements Clone<TimeZoneDate> {
    static readonly jsonTypeName = "TimeZoneDate";
    static fromJSON(json: any): TimeZoneDate | undefined;
    constructor();
    constructor(epoch: number, timeZone?: TimeZone);
    constructor(date: Date, timeZone?: TimeZone);
    constructor(isoDateString: string, timeZone?: TimeZone);
    timeZone: TimeZone;
    [clone](): TimeZoneDate;
    toString(): string;
    toJSON(): any;
}
export {};
