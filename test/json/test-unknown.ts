import {TimeZoneDate} from "@co.mmons/js-utils/core";
import {unserialize} from "@co.mmons/js-utils/json";

export function test() {

    const a = {"@type": "UnknownType", a: 1, b: 2, c: ["a", "b", "c"]};
    const unserialized = unserialize(a, undefined, {typeProviders: [TimeZoneDate]});
    console.log(unserialized);

    return unserialized !== undefined;
}
