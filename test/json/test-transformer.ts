import {serialize, unserialize} from "@co.mmons/js-utils/json";
import BigNumber from "bignumber.js";
import {A} from "./test-transformer-model";

export function test() {

    const a = new A;
    a.aBigNum = new BigNumber("1");

    const aSerialized = serialize(a);
    console.log("serialize a", aSerialized);

    const unserialized = unserialize(aSerialized, A);
    console.log("unserialized a", unserialized);
}
