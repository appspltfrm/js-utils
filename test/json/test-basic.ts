import {serializable, serialize, unserialize} from "@co.mmons/js-utils/json";
import BigNumber from "bignumber.js";

@serializable()
export class X {
    static readonly jsonTypeName: string = "X";

    xProp: Date;
}

interface Interface0 {

}
interface Interface extends Interface0 {
    sss: string;
}

@serializable()
export class A extends X {
    aProp: string;
    aPropDate: Date;
    aPropPartial: Partial<Date>;
    aPropInterface: Interface;
    aPropInterfaceUnion: Interface & {};
    aPropBigNumber: BigNumber;
}

export function test() {

    const a = new A;
    a.aProp = "a";
    a.xProp = new Date();
    a.aPropBigNumber = new BigNumber(0);

    console.log("a instance", a);

    const aSerialized = serialize(a);
    console.log("a serialized", aSerialized);

    const aUnserialized = unserialize(aSerialized, A);
    console.log("a unserialized", aUnserialized);

    const xUnserialized = unserialize(aSerialized, X);
    console.log("x unserialized", xUnserialized);

    return aUnserialized instanceof A && xUnserialized instanceof X;
}
