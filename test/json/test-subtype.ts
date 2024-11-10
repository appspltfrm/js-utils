import {serializable} from "@appspltfrm/js-utils/json/decorators/serializable.js";
import {subtype} from "@appspltfrm/js-utils/json/decorators/subtype.js";
import {serialize} from "@appspltfrm/js-utils/json/serialize.js";
import {unserialize} from "@appspltfrm/js-utils/json/unserialize.js";

@serializable()
class A {
    type: string;
}

@subtype(A, "type", "B")
class B extends A {
    constructor() {
        super();
        this.type = "B";
    }

    timestamp: Date;
}

@subtype(A, "type", "C")
class C extends A {
    constructor() {
        super();
        this.type = "C";
    }

    timestamp: Date;
}

export function test() {

    const b = new B();
    b.timestamp = new Date();
    console.log("b", b);

    const bSerialized = serialize(b);
    console.log("b serialized", b);

    const bUnserialized = unserialize(bSerialized, A);
    console.log("b unserialized", bUnserialized);

    const c = new C();
    c.type = "C";
    console.log("c", c);

    const cSerialized = serialize(c);
    console.log("c serialized", cSerialized);

    const cUnserialized = unserialize(cSerialized, A);
    console.log("c unserialized", cUnserialized);

    return bUnserialized instanceof B;
}
