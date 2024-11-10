import {serializable} from "@appspltfrm/js-utils/json/decorators/serializable.js";
import {BigNumber} from "bignumber.js";

@serializable()
export class A {
    aProp: string;
    aPropDate: Date;
    aBigNum: BigNumber;
}
