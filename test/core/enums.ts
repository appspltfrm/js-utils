import {
    Enum,
    EnumFromJSONValue,
    EnumStaticName,
    EnumValueName,
    EnumValueOfValue
} from "@appspltfrm/js-utils/core/Enum.js";

class A extends Enum {
    static readonly test1 = new A("test1");

    static values() {
        return super.values();
    }

    static valueOf(val: EnumValueOfValue) {
        return super.valueOf(val);
    }

    static fromJSON(val: EnumFromJSONValue) {
        return this.test1;
    }

    static aaa() {

    }

    constructor(name: EnumStaticName<typeof A>) {
        super(name);
    }
}

console.log(A.valueOf("test1"));
console.log(A.valueOf("test1").toJSON());
