"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoTimeDate = void 0;
const clone_js_1 = require("./clone.js");
/**
 * A date, that points to absolute date - no time, no time zone, just year-month-date.
 */
class NoTimeDate extends Date {
    static jsonTypeName = "NoTimeDate";
    static fromJSON(json) {
        if (typeof json === "object" && json && json["date"]) {
            return new NoTimeDate(json["date"]);
        }
        else if (json instanceof Date || typeof json === "number" || typeof json === "string") {
            return new NoTimeDate(json);
        }
        else {
            throw new Error(`Cannot unserialize "${JSON.stringify(json)}" to NoTimeDate`);
        }
    }
    constructor(valueOrYear, month, date) {
        if (typeof month === "number") {
            super(Date.UTC(valueOrYear, month, date, 0, 0, 0, 0));
        }
        else if (typeof valueOrYear === "number" || typeof valueOrYear === "string" || valueOrYear instanceof Date) {
            super(valueOrYear);
        }
        else {
            super();
        }
        this.setUTCHours(0, 0, 0, 0);
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
        return 0;
    }
    getMinutes() {
        return 0;
    }
    getSeconds() {
        return 0;
    }
    getMilliseconds() {
        return 0;
    }
    getTimezoneOffset() {
        return 0;
    }
    setTime(time) {
        super.setTime(time);
        this.setUTCHours(0, 0, 0, 0);
        return this.getTime();
    }
    setMilliseconds(ms) {
        return this.setUTCMilliseconds(ms);
    }
    setSeconds(sec, ms) {
        return this.setUTCSeconds(sec, ms);
    }
    setMinutes(min, sec, ms) {
        return this.setUTCMinutes(min, sec, ms);
    }
    setHours(hours, min, sec, ms) {
        return this.setUTCHours(hours, min, sec, ms);
    }
    getUTCHours() {
        return 0;
    }
    getUTCMinutes() {
        return 0;
    }
    getUTCSeconds() {
        return 0;
    }
    getUTCMilliseconds() {
        return 0;
    }
    setUTCMilliseconds(ms) {
        super.setUTCMilliseconds(ms);
        return super.setUTCHours(0, 0, 0, 0);
    }
    setUTCSeconds(sec, ms) {
        super.setUTCSeconds(sec, ms);
        return super.setUTCHours(0, 0, 0, 0);
    }
    setUTCMinutes(min, sec, ms) {
        super.setUTCMinutes(min, sec, ms);
        return super.setUTCHours(0, 0, 0, 0);
    }
    setUTCHours(hours, min, sec, ms) {
        super.setUTCHours(hours, min, sec, ms);
        return super.setUTCHours(0, 0, 0, 0);
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
    [clone_js_1.clone]() {
        return new NoTimeDate(this.getTime());
    }
    toString() {
        return this.toDateString();
    }
    toJSON() {
        return { "@type": NoTimeDate.jsonTypeName, date: super.toJSON() };
    }
}
exports.NoTimeDate = NoTimeDate;
//# sourceMappingURL=NoTimeDate.js.map