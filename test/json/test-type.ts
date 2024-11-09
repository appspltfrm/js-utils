import {globalType, serializable, serialize, unserialize} from "@co.mmons/js-utils/json";

export class X {
    static readonly jsonTypeName: string = "X";

    xProp: Date;
}

@globalType()
@serializable()
export class A extends X {
    static readonly jsonTypeName: string = "A";

    aProp: string;
}

export function test() {

    const a = new A;
    a.aProp = "a";
    a.xProp = new Date();

    console.log("a instance", a);

    const aSerialized = serialize(a);
    console.log("a serialized", aSerialized);

    const aUnserialized = unserialize(aSerialized);
    console.log("a unserialized", aUnserialized);

    const xUnserialized = unserialize(aSerialized, X);
    console.log("x unserialized", xUnserialized);

    return aUnserialized instanceof A && xUnserialized instanceof X;
}
