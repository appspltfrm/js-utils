import {clone, Clone} from "./clone.js";

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
export class NoTimeDate extends Date implements Clone<NoTimeDate> {

  static readonly jsonTypeName = "NoTimeDate";

  /**
     * Unserializes a JSON value into a NoTimeDate instance.
     * @param json The JSON value (object, string, number, or Date).
     * @returns A new NoTimeDate instance.
     */
  static fromJSON(json: any): NoTimeDate {
    if (typeof json === "object" && json && json["date"]) {
      return new NoTimeDate(json["date"]);
    } else if (json instanceof Date || typeof json === "number" || typeof json === "string") {
      return new NoTimeDate(json);
    } else {
      throw new Error(`Cannot unserialize "${JSON.stringify(json)}" to NoTimeDate`);
    }
  }

  constructor();

  constructor(value: number | string | Date);

  constructor(year: number, month: number, date: number);

  /**
     * Creates a new NoTimeDate instance.
     */
  constructor(valueOrYear?: number | string | Date, month?: number, date?: number) {

    if (typeof month === "number") {
      super(Date.UTC(valueOrYear as number, month, date, 0, 0, 0, 0));
    } else if (typeof valueOrYear === "number" || typeof valueOrYear === "string" || valueOrYear instanceof Date) {
      super(valueOrYear);
    } else {
      super();
    }

    this.setUTCHours(0, 0, 0, 0);
  }

  getFullYear(): number {
    return super.getUTCFullYear();
  }

  getMonth(): number {
    return super.getUTCMonth();
  }

  getDate(): number {
    return super.getUTCDate();
  }

  getDay(): number {
    return super.getUTCDay();
  }

  getHours(): number {
    return 0;
  }

  getMinutes(): number {
    return 0;
  }

  getSeconds(): number {
    return 0;
  }

  getMilliseconds(): number {
    return 0;
  }

  getTimezoneOffset(): number {
    return 0;
  }

  setTime(time: number): number {
    super.setTime(time);
    this.setUTCHours(0, 0, 0, 0);
    return this.getTime();
  }

  setMilliseconds(ms: number): number {
    return this.setUTCMilliseconds(ms);
  }

  setSeconds(sec: number, ms?: number): number {
    return this.setUTCSeconds(sec, ms);
  }

  setMinutes(min: number, sec?: number, ms?: number): number {
    return this.setUTCMinutes(min, sec, ms);
  }

  setHours(hours: number, min?: number, sec?: number, ms?: number): number {
    return this.setUTCHours(hours, min, sec, ms);
  }

  getUTCHours(): number {
    return 0;
  }

  getUTCMinutes(): number {
    return 0;
  }

  getUTCSeconds(): number {
    return 0;
  }

  getUTCMilliseconds(): number {
    return 0;
  }

  setUTCMilliseconds(ms: number): number {
    super.setUTCMilliseconds(ms);
    return super.setUTCHours(0, 0, 0, 0);
  }

  setUTCSeconds(sec: number, ms?: number): number {
    super.setUTCSeconds(sec, ms);
    return super.setUTCHours(0, 0, 0, 0);
  }

  setUTCMinutes(min: number, sec?: number, ms?: number): number {
    super.setUTCMinutes(min, sec, ms);
    return super.setUTCHours(0, 0, 0, 0);
  }

  setUTCHours(hours: number, min?: number, sec?: number, ms?: number): number {
    super.setUTCHours(hours, min, sec, ms);
    return super.setUTCHours(0, 0, 0, 0);
  }

  setDate(date: number): number {
    return super.setUTCDate(date);
  }

  setMonth(month: number, date?: number): number {
    return super.setUTCMonth(month, date);
  }

  setFullYear(year: number, month?: number, date?: number): number {
    return super.setUTCFullYear(year, month, date);
  }

  toDateString(): string {
    return new Intl.DateTimeFormat(undefined, {
      timeZone: "UTC",
      timeZoneName: undefined,
      hour: undefined,
      minute: undefined,
      second: undefined
    }).format(this);
  }

  toTimeString(): string {
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

  [clone](): NoTimeDate {
    return new NoTimeDate(this.getTime());
  }

  toString(): string {
    return this.toDateString();
  }

  toJSON(): any {
    return {"@type": NoTimeDate.jsonTypeName, date: super.toJSON()};
  }
}
