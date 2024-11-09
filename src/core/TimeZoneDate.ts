import {clone, Clone} from "./clone.js";

type TimeZone = string | "current" | undefined | null;

export class TimeZoneDate extends Date implements Clone<TimeZoneDate> {

    static readonly jsonTypeName = "TimeZoneDate";

    static fromJSON(json: any) {
        if (typeof json === "object" && json && json["date"]) {
            return new TimeZoneDate(json["date"], json["timeZone"]);
        } else if (json instanceof Date) {
            return new TimeZoneDate(json);
        } else if (typeof json === "number") {
            return new TimeZoneDate(json);
        }
    }

    constructor();

    constructor(epoch: number, timeZone?: TimeZone);

    constructor(date: Date, timeZone?: TimeZone);

    constructor(isoDateString: string, timeZone?: TimeZone);

    constructor(dateOrEpoch?: Date | number | string, timeZone?: TimeZone) {

        if (dateOrEpoch !== undefined) {
            super(dateOrEpoch);
        } else {
            super();
        }

        this.timeZone = timeZone;
    }

    timeZone: TimeZone;

    [clone]() {
        return new TimeZoneDate(this.getTime(), this.timeZone);
    }

    toString() {
        return new Intl.DateTimeFormat(undefined, {timeZone: this.timeZone, timeZoneName: "short"}).format(this);
    }

    toJSON(): any {

        const json = {"@type": "TimeZoneDate", date: super.toJSON()};

        if (this.timeZone) {
            json["timeZone"] = this.timeZone;
        }

        return json;
    }
}
