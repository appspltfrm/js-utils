import {LocalDate} from "../core/LocalDate.js";
import {NoTimeDate} from "../core/NoTimeDate.js";
import {TimeZoneDate} from "../core/TimeZoneDate.js";
import {BooleanSerializer} from "./serializers/BooleanSerializer.js";
import {DateSerializer} from "./serializers/DateSerializer.js";
import {NumberSerializer} from "./serializers/NumberSerializer.js";
import {RegExpSerializer} from "./serializers/RegExpSerializer";
import {StringSerializer} from "./serializers/StringSerializer.js";
import {InternalTypeProvider} from "./TypeProvider.js";

export const globalProviders: InternalTypeProvider[] = [
    {type: Boolean, serializer: BooleanSerializer.instance},
    {type: Date, name: "Date", serializer: DateSerializer.instance},
    {type: LocalDate, name: LocalDate.jsonTypeName, serializer: DateSerializer.instance},
    {type: NoTimeDate, name: NoTimeDate.jsonTypeName, serializer: DateSerializer.instance},
    {type: Number, serializer: NumberSerializer.instance},
    {type: RegExp, serializer: RegExpSerializer.instance},
    {type: String, serializer: StringSerializer.instance},
    {type: TimeZoneDate, name: TimeZoneDate.jsonTypeName, serializer: DateSerializer.instance}
];

