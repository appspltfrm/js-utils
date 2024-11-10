import {TimeZoneDate} from "@appspltfrm/js-utils/core/TimeZoneDate.js";
import {unserialize} from "@appspltfrm/js-utils/json/unserialize.js";

export function test() {

    const a = {"@type": "UnknownType", a: 1, b: 2, c: ["a", "b", "c"]};
    const unserialized = unserialize(a, undefined, {typeProviders: [TimeZoneDate]});
    console.log(unserialized);

    return unserialized !== undefined;
}
