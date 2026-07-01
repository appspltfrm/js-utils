import { SerializationOptions } from "./SerializationOptions.js";
import { Serializer } from "./Serializer.js";
/**
 * Only for the transition from BigNumber to BNumber, to keep serialization to a clean string,
 * but also read serialized BNumber.
 */
export declare class BigNumberSerializer extends Serializer {
    serialize(value: any, options?: SerializationOptions): any;
    unserialize(value: any, options?: SerializationOptions): any;
}
export declare namespace BigNumberSerializer {
    const instance: BigNumberSerializer;
}
