import {serializable} from "@co.mmons/js-utils/json";
import BigNumber from "bignumber.js";

@serializable()
export class A {
    aProp: string;
    aPropDate: Date;
    aBigNum: BigNumber;
}
