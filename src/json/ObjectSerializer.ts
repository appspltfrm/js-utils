import {Type} from "../core/Type.js";
import {findTypeSerializer} from "./_findTypeSerializer.js";
import {SerializationOptions} from "./SerializationOptions.js";
import {_serializeImpl} from "./_serializeImpl.js";
import {Serializer} from "./Serializer.js";
import {TypeProvider} from "./TypeProvider.js";
import {_unserializeImpl} from "./_unserializeImpl.js";

/**
 * Basic serializer.
 */
export class ObjectSerializer extends Serializer {

  constructor(type?: Type) {
    super();

    if (type && type !== Object && type !== Array) {
      this.type = type;
    }
  }

  private readonly type?: Type;

  serialize(object: any, options?: SerializationOptions): any {
    return _serializeImpl(object, this.type, options);
  }

  unserialize(json: any, options?: SerializationOptions): any {
    return _unserializeImpl(json, this.type, options);
  }
}

export namespace ObjectSerializer {
  export const instance = new ObjectSerializer();

  export function getTypeSerializer(type: Type, typeProviders?: TypeProvider[]) {
    const serializer = findTypeSerializer(type, typeProviders);
    if (serializer) {
      return serializer;
    } else {
      return new ObjectSerializer(type);
    }
  }
}
