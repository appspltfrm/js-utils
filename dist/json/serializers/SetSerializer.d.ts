import { Type } from "../../core/Type.js";
import { SerializationOptions } from "../SerializationOptions.js";
import { Serializer } from "../Serializer.js";
export declare class SetSerializer<T> extends Serializer<T[]> {
    constructor(valueTypeOrSerializer?: Type<T> | Serializer<T>);
    private readonly typeOrSerializer;
    serialize(value: any, options?: SerializationOptions): any;
    unserialize(json: any, options?: SerializationOptions): any;
}
export declare namespace SetSerializer {
    const ofAny: SetSerializer<any>;
    const ofString: SetSerializer<String>;
    const ofNumber: SetSerializer<Number>;
    const ofBoolean: SetSerializer<Boolean>;
}
