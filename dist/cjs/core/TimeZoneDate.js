"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeZoneDate = void 0;
const clone_js_1 = require("./clone.js");
class TimeZoneDate extends Date {
    static jsonTypeName = "TimeZoneDate";
    static fromJSON(json) {
        if (typeof json === "object" && json && json["date"]) {
            return new TimeZoneDate(json["date"], json["timeZone"]);
        }
        else if (json instanceof Date) {
            return new TimeZoneDate(json);
        }
        else if (typeof json === "number") {
            return new TimeZoneDate(json);
        }
    }
    constructor(dateOrEpoch, timeZone) {
        if (dateOrEpoch !== undefined) {
            super(dateOrEpoch);
        }
        else {
            super();
        }
        this.timeZone = timeZone;
    }
    timeZone;
    [clone_js_1.clone]() {
        return new TimeZoneDate(this.getTime(), this.timeZone);
    }
    toString() {
        return new Intl.DateTimeFormat(undefined, { timeZone: this.timeZone, timeZoneName: "short" }).format(this);
    }
    toJSON() {
        const json = { "@type": "TimeZoneDate", date: super.toJSON() };
        if (this.timeZone) {
            json["timeZone"] = this.timeZone;
        }
        return json;
    }
}
exports.TimeZoneDate = TimeZoneDate;
//# sourceMappingURL=TimeZoneDate.js.map