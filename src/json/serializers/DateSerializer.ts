import {LocalDate} from "../../core/LocalDate.js";
import {TimeZoneDate} from "../../core/TimeZoneDate.js";
import {NoTimeDate} from "../../core/NoTimeDate.js";
import {SerializationOptions} from "../SerializationOptions.js";
import {Serializer} from "../Serializer.js";

/**
 * Serializer for Date type.
 * Date is serialized to typed json: {"@type": "Date", value: Date.toISOString}.
 * Date can be unserialized from ISO string, timestamp number, Date instance of typed json.
 */
export class DateSerializer extends Serializer {

    serialize(value: any, options?: SerializationOptions): any {
        if (this.isUndefinedOrNull(value)) {
            return this.serializeUndefinedOrNull(value, options);

        } else if (value instanceof TimeZoneDate || value instanceof LocalDate || value instanceof NoTimeDate) {
            return value.toJSON();

        } else if (value instanceof Date) {
            return {"@type": "Date", value: value.toJSON()};

        } else if (typeof value === "object" && typeof value.toDate === "function" && typeof value.toMillis === "function") {
            return {"@type": "Date", value: value.toDate().toJSON()};

        } else if (options && options.notStrict && typeof value == "number") {
            return {"@type": "Date", value: new Date(value).toJSON()};

        } else if (!options || !options.ignoreErrors) {
            throw new Error(`Cannot serialize "${value}" as Date`);

        } else {
            return undefined;
        }
    }

    unserialize(value: any, options?: SerializationOptions): any {

        if (this.isUndefinedOrNull(value)) {
            return this.unserializeUndefinedOrNull(value, options);

        } else if (value instanceof Date) {
            return value;

        } else if (typeof value === "string") {
            return new Date(value);

        } else if (typeof value === "number" && options && options.notStrict) {
            return new Date(new Date().setTime(value));

        } else if (typeof value === "object" && typeof value.toDate === "function" && typeof value.toMillis === "function") {
            return value.toDate();

        } else if (typeof value === "object" && value["@type"] === NoTimeDate.jsonTypeName && value.date) {
            return NoTimeDate.fromJSON(value.date);

        } else if (typeof value === "object" && value["@type"] === TimeZoneDate.jsonTypeName && value.date) {
            return TimeZoneDate.fromJSON(value);

        } else if (typeof value === "object" && value["@type"] === LocalDate.jsonTypeName && value.date) {
            return LocalDate.fromJSON(value.date);

        } else if (typeof value === "object" && value["@type"] === "Date" && value.value) {
            return new Date(value.value);

        } else if (!options || !options.ignoreErrors) {
            throw new Error(`Cannot unserialize "${value}" to Date, LocalDate or TimeZoneDate`);

        } else {
            return undefined;
        }
    }

}

export namespace DateSerializer {
    export const instance = new DateSerializer;
}
