import {ignore, property, serializable, globalType} from "@co.mmons/js-utils/json";
import {ArraySerializer} from "@co.mmons/js-utils/json/serializers";

export class ModelA {

    baseFieldString: string = "ssd";

}

export class ModelB extends ModelA {

    constructor() {
        super();
        this.type = "B";
        console.log("called constructor b");
    }

    @property()
    type: string;

    @property(String, "jsonFieldString")
    fieldWithJsonName: string;

    @ignore()
    ignoredFieldModelB: number;

    fieldNumberAsString: number;

    @property(Boolean, "__fieldBoolean")
    fieldBoolean: boolean;

    @property(ArraySerializer.ofString)
    fieldArray: string[];

}

export class ModelC {
    constructor(b: ModelB) {
        this.fieldModelB = b;
    }

    @property(ModelB)
    fieldModelB: ModelB;

}

@serializable()
export class ModelD extends ModelB {

    constructor() {
        super();
        this.type = "D";
        console.log("called constructor d");
    }

    fieldModelD: boolean;
}

@globalType()
export class ModelAutoRegister {
    static readonly jsonTypeName = "ModelAutoRegister";
}
