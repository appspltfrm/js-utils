import { TimeZoneDate } from "../core/TimeZoneDate.js";
import { LocalDate } from "../core/LocalDate.js";
import { NoTimeDate } from "../core/NoTimeDate.js";
import { BooleanSerializer } from "./serializers/BooleanSerializer.js";
import { DateSerializer } from "./serializers/DateSerializer.js";
import { NumberSerializer } from "./serializers/NumberSerializer.js";
import { StringSerializer } from "./serializers/StringSerializer.js";
export const globalProviders = [
    { type: Boolean, serializer: BooleanSerializer.instance },
    { type: Number, serializer: NumberSerializer.instance },
    { type: Date, name: "Date", serializer: DateSerializer.instance },
    { type: NoTimeDate, name: NoTimeDate.jsonTypeName, serializer: DateSerializer.instance },
    { type: LocalDate, name: LocalDate.jsonTypeName, serializer: DateSerializer.instance },
    { type: TimeZoneDate, name: TimeZoneDate.jsonTypeName, serializer: DateSerializer.instance },
    { type: String, serializer: StringSerializer.instance }
];
//# sourceMappingURL=globalProviders.js.map