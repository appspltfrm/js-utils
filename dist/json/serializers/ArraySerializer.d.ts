import { Type } from "../../core/Type.js";
import { SerializationOptions } from "../SerializationOptions.js";
import { Serializer } from "../Serializer.js";
/**
 * Serializer for arrays of a specific type.
 *
 * @example
 * ```typescript
 * const serializer = new ArraySerializer(User);
 * const json = serializer.serialize([new User("Jan"), new User("Marek")]);
 * ```
 */
export declare class ArraySerializer<T = any> extends Serializer<T[]> {
    /**
       * Creates a new ArraySerializer.
       * @param valueTypeOrSerializer The type or custom serializer for array elements.
       */
    constructor(valueTypeOrSerializer?: Type<T> | Serializer<T>);
    /**
       * The type or serializer used for individual array elements.
       */
    readonly typeOrSerializer: Type | Serializer | undefined;
    /**
       * Serializes an array of values.
       */
    serialize(value: any, options?: SerializationOptions): any;
    /**
       * Unserializes a JSON array into an array of class instances.
       */
    unserialize(json: any, options?: SerializationOptions): any;
}
/**
 * Pre-defined instances of ArraySerializer for common types.
 */
export declare namespace ArraySerializer {
    const ofAny: ArraySerializer<any>;
    const ofString: ArraySerializer<String>;
    const ofNumber: ArraySerializer<Number>;
    const ofBoolean: ArraySerializer<Boolean>;
}
