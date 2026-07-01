import { SerializationOptions } from "./SerializationOptions.js";
import { Serializer } from "./Serializer.js";
/**
 * Tylko na potrzeby tranzycji z BigNumber do BNumber, aby zachować serializację do czystego string, ale
 * odczytywac też zserializowany BNumber.
 */
export declare class BigNumberSerializer extends Serializer {
    serialize(value: any, options?: SerializationOptions): any;
    unserialize(value: any, options?: SerializationOptions): any;
}
export declare namespace BigNumberSerializer {
    const instance: BigNumberSerializer;
}
