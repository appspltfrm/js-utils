"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalProviders = void 0;
const TimeZoneDate_js_1 = require("../core/TimeZoneDate.js");
const LocalDate_js_1 = require("../core/LocalDate.js");
const NoTimeDate_js_1 = require("../core/NoTimeDate.js");
const BooleanSerializer_js_1 = require("./serializers/BooleanSerializer.js");
const DateSerializer_js_1 = require("./serializers/DateSerializer.js");
const NumberSerializer_js_1 = require("./serializers/NumberSerializer.js");
const StringSerializer_js_1 = require("./serializers/StringSerializer.js");
exports.globalProviders = [
    { type: Boolean, serializer: BooleanSerializer_js_1.BooleanSerializer.instance },
    { type: Number, serializer: NumberSerializer_js_1.NumberSerializer.instance },
    { type: Date, name: "Date", serializer: DateSerializer_js_1.DateSerializer.instance },
    { type: NoTimeDate_js_1.NoTimeDate, name: NoTimeDate_js_1.NoTimeDate.jsonTypeName, serializer: DateSerializer_js_1.DateSerializer.instance },
    { type: LocalDate_js_1.LocalDate, name: LocalDate_js_1.LocalDate.jsonTypeName, serializer: DateSerializer_js_1.DateSerializer.instance },
    { type: TimeZoneDate_js_1.TimeZoneDate, name: TimeZoneDate_js_1.TimeZoneDate.jsonTypeName, serializer: DateSerializer_js_1.DateSerializer.instance },
    { type: String, serializer: StringSerializer_js_1.StringSerializer.instance }
];
//# sourceMappingURL=globalProviders.js.map