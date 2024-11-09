import {Enum, EnumValueOfValue} from "@co.mmons/js-utils/core";

class A extends Enum {
    static readonly test1 = new A("test1");

    static values() {
        return super.values();
    }

    static valueOf(val: EnumValueOfValue) {
        return super.valueOf(val);
    }
}

console.log(A.valueOf("test1"));
console.log(A.valueOf("test1").toJSON());
