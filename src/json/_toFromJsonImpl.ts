import {resolveForwardRef} from "../core/resolveForwardRef.js";
import {AssignableType, Type} from "../core/Type.js";
import {PropertyConfig} from "./PropertyConfig.js";
import {findTypeSerializer} from "./_findTypeSerializer.js";
import {getPrototypesTree} from "./_getPrototypesTree.js";
import {identifyType} from "./_identifyType.js";
import {InternalType} from "./_InternalType.js";
import {SerializationOptions} from "./SerializationOptions.js";
import {_serializeImpl} from "./_serializeImpl.js";
import {Serializer} from "./Serializer.js";
import {ArraySerializer} from "./ArraySerializer.js";
import {TypeProvider} from "./TypeProvider.js";
import {_unserializeImpl} from "./_unserializeImpl.js";

export function toJsonImpl(this: any, options?: SerializationOptions) {

  const prototypesTree = getPrototypesTree(this);
  const typesTree = getTypesTree(prototypesTree);
  const serializationOptions: SerializationOptions = {
    ...options,
    typeProviders: ([] as TypeProvider[]).concat(options?.typeProviders ?? [], typesTree[0].__jsonTypes ?? [])
  };

  let json: any = {};

  // call toJSON for super types, only if hard coded in a class
  for (let t = 1; t < typesTree.length; t++) {
    if (!typesTree[t].__jsonToJson && prototypesTree[t].hasOwnProperty("toJSON")) {

      const prototypeJson = prototypesTree[t].toJSON.call(this);
      if (prototypeJson && typeof prototypeJson === "object") {
        json = prototypeJson;
      }

      break;
    }
  }

  const properties = getDeclaredProperties(this, typesTree);

  for (const propertyName in properties) {
    const config = properties[propertyName] as PropertyConfig;
    const value = this[propertyName];

    if (value === undefined || typeof value === "function") {
      continue;
    }

    const propertyOptions = mergePropertyOptions(serializationOptions, config);
    const name = config.propertyJsonName ? config.propertyJsonName : propertyName;

    if (Array.isArray(value)) {
      const serializer = config.propertyType instanceof Serializer ? config.propertyType : (config.propertyType && findTypeSerializer(config.propertyType, propertyOptions.typeProviders));

      if (serializer instanceof ArraySerializer) {
        json[name] = serializer.serialize(value, propertyOptions);
      } else {
        json[name] = [];
        for (const i of value) {
          json[name].push(serializer ? serializer.serialize(i, propertyOptions) : _serializeImpl(i, config.propertyType as any, propertyOptions));
        }
      }
    } else {
      const type = (config.propertyType || config.propertyDesignType) ?? identifyType(value);
      const serializer = config.propertyType instanceof Serializer ? config.propertyType : findTypeSerializer(type, propertyOptions.typeProviders);
      if (serializer) {
        json[name] = serializer.serialize(value, propertyOptions);
      } else {
        json[name] = _serializeImpl(value, type, propertyOptions);
      }
    }
  }

  if (typesTree[0].hasOwnProperty("jsonTypeName")) {
    json["@type"] = (typesTree[0] as InternalType).jsonTypeName;
  }

  return json;
}

export function fromJsonImpl(this: AssignableType, json: any, options?: SerializationOptions) {

  const internalType = this as InternalType;

  let instance: any;

  if (!instance && internalType.__jsonSubtypes) {
    for (const subtype of internalType.__jsonSubtypes) {

      let matchedType: (InternalType & AssignableType) | undefined;

      if (subtype.matcher) {

        const match = subtype.matcher(json);
        if (match) {
          matchedType = resolveForwardRef(match);
        }

      } else if (subtype.property && ((typeof subtype.value === "function" && subtype.value(json[subtype.property])) || (typeof subtype.value !== "function" && json[subtype.property] === subtype.value))) {
        matchedType = resolveForwardRef(subtype.type);
      }

      if (matchedType && matchedType !== this) {

        if (matchedType.hasOwnProperty("fromJSON")) {
          return matchedType.fromJSON!(json, options);
        }

        instance = new matchedType;
        break;
      }
    }
  }

  if (!instance) {
    instance = new this();
  }

  const prototypesTree = getPrototypesTree(instance);
  const typesTree = getTypesTree(prototypesTree);
  const serializationOptions: SerializationOptions = {
    ...options,
    typeProviders: ([] as TypeProvider[]).concat(options?.typeProviders ?? [], typesTree[0].__jsonTypes ?? [])
  };

  const properties = getDeclaredProperties(instance, typesTree);

  // property names that already unserialized
  const unserializedProperties: string[] = [];

  // unserialize known properties
  for (const propertyName in properties) {
    const config = properties[propertyName] as PropertyConfig;
    const name = config.propertyJsonName ? config.propertyJsonName : propertyName;

    if (name in json) {

      const value = json[name];
      if (typeof value === "function") {
        continue;
      }

      const propertyOptions = mergePropertyOptions(serializationOptions, config);

      if (Array.isArray(value)) {
        const serializer = config.propertyType instanceof Serializer ? config.propertyType : (config.propertyType && findTypeSerializer(config.propertyType, propertyOptions.typeProviders));

        if (serializer instanceof ArraySerializer) {
          instance[propertyName] = serializer.unserialize(value, propertyOptions);
        } else {
          instance[propertyName] = [];
          for (const i of value) {
            instance[propertyName].push(serializer ? serializer.unserialize(i, propertyOptions) : _unserializeImpl(i, config.propertyType as Type<any>, propertyOptions));
          }
        }

      } else {
        const type = (config.propertyType || config.propertyDesignType) ?? identifyType(value);
        const serializer = config.propertyType instanceof Serializer ? config.propertyType : findTypeSerializer(type, propertyOptions.typeProviders);
        instance[propertyName] = serializer ? serializer.unserialize(value, propertyOptions) : _unserializeImpl(value, type, propertyOptions);
      }

      unserializedProperties.push(name);
    }
  }

  // copy json properties, that were not unserialized above
  for (const propertyName in json) {

    if (propertyName === "@type" && (typesTree[0] as InternalType).jsonTypeName) {
      continue;
    }

    if (unserializedProperties.indexOf(propertyName) < 0) {
      instance[propertyName] = _unserializeImpl(json[propertyName], null, serializationOptions);
    }
  }

  return instance;
}

function getTypesTree(prototypes: any[]): Array<Type & InternalType> {
  return prototypes.map(type => type.constructor);
}

/**
 * Merges the shared (class/call-level) serialization options with the options declared on a single property
 * via the `@property(...)` decorator. Property-level options take precedence over the shared ones; per-property
 * type providers are placed first so the more-specific providers win on conflict.
 */
function mergePropertyOptions(base: SerializationOptions, config: PropertyConfig): SerializationOptions {

  const {propertyType, propertyDesignType, propertyJsonName, typeProviders, ...propertyOptions} = config;

  // Fast path: property carries no own serialization options, reuse the shared base object.
  if (typeProviders === undefined && Object.keys(propertyOptions).length === 0) {
    return base;
  }

  return {
    ...base,
    ...propertyOptions,
    typeProviders: ([] as TypeProvider[]).concat(typeProviders ?? [], base.typeProviders ?? [])
  };
}

function getDeclaredProperties(thiz: any, types: Type[]): {[propertyName: string]: PropertyConfig} {

  let properties: {[propertyName: string]: {}} = {};

  for (let t = types.length - 1; t >= 0; t--) {
    const internalType = types[t] as InternalType;

    if (internalType.__jsonSerialization) {

      if (internalType.__jsonProperties) {
        properties = Object.assign(properties, internalType.__jsonProperties);
      }

      if (internalType.__jsonIgnoredProperties) {
        for (const propertyName of internalType.__jsonIgnoredProperties) {
          delete properties[propertyName];
        }
      }
    }
  }

  return properties;
}
