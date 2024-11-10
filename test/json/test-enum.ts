import {Enum, EnumFromJSONValue, EnumValueName, EnumValueOfValue} from "@appspltfrm/js-utils/core/Enum.js";
import {property} from "@appspltfrm/js-utils/json/decorators/property.js";
import {serializable} from "@appspltfrm/js-utils/json/decorators/serializable.js";
import {serialize} from "@appspltfrm/js-utils/json/serialize.js";
import {EnumAsStringSerializer} from "@appspltfrm/js-utils/json/serializers/EnumAsStringSerializer.js";
import {unserialize} from "@appspltfrm/js-utils/json/unserialize.js";

export class E extends Enum {

    static readonly test = new E("test");

    static values() {
        return super.values() as E[];
    }

    static valueOf(name: EnumValueOfValue) {
        return super.valueOf(name) as E;
    }

    static fromJSON(value: EnumFromJSONValue) {
        return super.fromJSON(value) as E;
    }

    private constructor(name: EnumValueName<typeof E>) {
        super(name);
    }
}


@serializable()
export class A {

    @property(E)
    a: E;

    @property(new EnumAsStringSerializer(E))
    b: E;

}

export function test() {

    const a = new A;
    a.a = E.test;
    a.b = E.test;

    console.log("a instance", a);

    const aSerialized = serialize(a);
    console.log("a serialized", aSerialized);

    const aUnserialized = unserialize(aSerialized, A) as A;
    console.log("a unserialized", aUnserialized);

    return aUnserialized.a instanceof E && aUnserialized.b instanceof E;
}
