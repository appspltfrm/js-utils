import {LocalDate} from "@appspltfrm/js-utils/core/LocalDate.js";
import {NoTimeDate} from "@appspltfrm/js-utils/core/NoTimeDate.js";
import {TimeZoneDate} from "@appspltfrm/js-utils/core/TimeZoneDate.js";
import {compareDate} from "@appspltfrm/js-utils/core/compareDate.js";

const testTimeZoneDate = new TimeZoneDate(new Date(), "Africa/Maputo");
const testLocalDate = new LocalDate(2025, 6, 4, 2, 0, 0, 0);
const testNoTimeDate = new NoTimeDate();
const testDate = new Date();

console.log({testTimeZoneDate, testLocalDate, testNoTimeDate, testDate});
console.log(compareDate(testLocalDate, testNoTimeDate, true))