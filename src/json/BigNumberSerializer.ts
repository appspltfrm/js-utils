import {SerializationOptions} from "./SerializationOptions.js";
import {Serializer} from "./Serializer.js";
import BigNumber from "bignumber.js";

/**
 * Only for the transition from BigNumber to BNumber, to keep serialization to a clean string,
 * but also read serialized BNumber.
 */
export class BigNumberSerializer extends Serializer {

  serialize(value: any, options?: SerializationOptions): any {
    if (this.isUndefinedOrNull(value)) {
      return this.serializeUndefinedOrNull(value, options);
    } else if (value instanceof BigNumber) {
      return value.valueOf();
    } else if (!options || !options.ignoreErrors) {
      throw new Error(`Cannot serialize "${value}" as BigNumber`);
    } else {
      return undefined;
    }
  }

  unserialize(value: any, options?: SerializationOptions): any {
    if (value instanceof BigNumber) {
      return value;
    } else if (this.isUndefinedOrNull(value)) {
      return this.unserializeUndefinedOrNull(value, options);
    } else if (typeof value === "object" && typeof value.value === "string") {
      return new BigNumber(value.value);
    } else if (typeof value === "string" || typeof value === "number") {
      return new BigNumber(value);
    } else if (!options || !options.ignoreErrors) {
      throw new Error(`Cannot unserialize "${value}" to BigNumber`);
    } else {
      return undefined;
    }
  }

}

export namespace BigNumberSerializer {
  export const instance = new BigNumberSerializer();
}

