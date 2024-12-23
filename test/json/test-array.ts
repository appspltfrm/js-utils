import {property} from "@appspltfrm/js-utils/json/decorators/property.js";
import {serializable} from "@appspltfrm/js-utils/json/decorators/serializable.js";
import {SerializationOptions} from "@appspltfrm/js-utils/json/SerializationOptions.js";
import {serialize} from "@appspltfrm/js-utils/json/serialize.js";
import {ArraySerializer} from "@appspltfrm/js-utils/json/serializers/ArraySerializer.js";
import {unserialize} from "@appspltfrm/js-utils/json/unserialize.js";

@serializable()
class Ha1 {
    static jsonTypeName = "Ha1";
}

@serializable()
class Ha extends Ha1 {
    static jsonTypeName = "Ha";

    @property(Ha)
    gzz: Ha[];
}

class CustomArraySerializer extends ArraySerializer<any> {

    serialize(value: any, options?: SerializationOptions): any {
        return {"yees": value};
    }

    unserialize(json: any, options?: SerializationOptions): any {
        return json.yees;
    }
}

@serializable()
export class A {

    @property(Ha1)
    aProp: Ha1[];

    @property(new CustomArraySerializer)
    bProp: string[];

    someFunction() {
        return true;
    }
}


export function test() {

    const a = new A;
    const ha = new Ha();
    ha.gzz = [new Ha(), new Ha()];
    a.aProp = [ha, new Ha1];
    a.bProp = ["a", "b", "c"];

    console.log("a instance");
    console.dir(a, {depth: null});

    const aSerialized = serialize(a);
    console.log("a serialized");
    console.dir(aSerialized, {depth: null});

    const aUnserialized = unserialize(aSerialized, A);
    console.log("a unserialized");
    console.dir(aUnserialized, {depth: null});

    return aUnserialized instanceof A;
}
