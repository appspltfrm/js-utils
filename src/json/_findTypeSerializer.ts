import {Type} from "../core/Type.js";
import {FromJsonType} from "./FromJsonType.js";
import {globalProviders} from "./_globalProviders.js";
import {Serializer} from "./Serializer.js";
import {InternalTypeProviders, TypeProviders} from "./TypeProvider.js";

export function findTypeSerializer(type: Type | FromJsonType | undefined, typeProviders?: TypeProviders): Serializer | undefined {

  if (!type || type === Object || type === Array) {
    return;
  }

  if (typeProviders) {
    for (const provider of typeProviders as InternalTypeProviders) {
      if (Array.isArray(provider)) {
        const result = findTypeSerializer(type, provider as any);
        if (result) {
          return result;
        }
      } else if (provider.type === type && provider.serializer) {
        return provider.serializer;
      }
    }
  }

  for (const provider of globalProviders) {
    if (provider.type === type && provider.serializer) {
      return provider.serializer;
    }
  }
}
