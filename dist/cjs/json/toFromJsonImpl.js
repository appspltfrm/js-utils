"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toJsonImpl = toJsonImpl;
exports.fromJsonImpl = fromJsonImpl;
const resolveForwardRef_js_1 = require("../core/resolveForwardRef.js");
const findTypeSerializer_js_1 = require("./findTypeSerializer.js");
const getPrototypesTree_js_1 = require("./getPrototypesTree.js");
const identifyType_js_1 = require("./identifyType.js");
const serializeImpl_js_1 = require("./serializeImpl.js");
const Serializer_js_1 = require("./Serializer.js");
const ArraySerializer_js_1 = require("./serializers/ArraySerializer.js");
const unserializeImpl_js_1 = require("./unserializeImpl.js");
function toJsonImpl(options) {
    const prototypesTree = (0, getPrototypesTree_js_1.getPrototypesTree)(this);
    const typesTree = getTypesTree(prototypesTree);
    const serializationOptions = { typeProviders: [].concat(options?.typeProviders ?? [], typesTree[0].__jsonTypes ?? []) };
    let json = {};
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
        const config = properties[propertyName];
        const value = this[propertyName];
        if (value === undefined || typeof value === "function") {
            continue;
        }
        const name = config.propertyJsonName ? config.propertyJsonName : propertyName;
        if (Array.isArray(value)) {
            const serializer = config.propertyType instanceof Serializer_js_1.Serializer ? config.propertyType : (config.propertyType && (0, findTypeSerializer_js_1.findTypeSerializer)(config.propertyType, serializationOptions.typeProviders));
            if (serializer instanceof ArraySerializer_js_1.ArraySerializer) {
                json[name] = serializer.serialize(value, serializationOptions);
            }
            else {
                json[name] = [];
                for (const i of value) {
                    json[name].push(serializer ? serializer.serialize(i, serializationOptions) : (0, serializeImpl_js_1.serializeImpl)(i, config.propertyType, serializationOptions));
                }
            }
        }
        else {
            const type = (config.propertyType || config.propertyDesignType) ?? (0, identifyType_js_1.identifyType)(value);
            const serializer = config.propertyType instanceof Serializer_js_1.Serializer ? config.propertyType : (0, findTypeSerializer_js_1.findTypeSerializer)(type, serializationOptions.typeProviders);
            if (serializer) {
                json[name] = serializer.serialize(value, serializationOptions);
            }
            else {
                json[name] = (0, serializeImpl_js_1.serializeImpl)(value, type, serializationOptions);
            }
        }
    }
    if (typesTree[0].hasOwnProperty("jsonTypeName")) {
        json["@type"] = typesTree[0].jsonTypeName;
    }
    return json;
}
function fromJsonImpl(json, options) {
    const internalType = this;
    let instance;
    if (!instance && internalType.__jsonSubtypes) {
        for (const subtype of internalType.__jsonSubtypes) {
            let matchedType;
            if (subtype.matcher) {
                const match = subtype.matcher(json);
                if (match) {
                    matchedType = (0, resolveForwardRef_js_1.resolveForwardRef)(match);
                }
            }
            else if (subtype.property && ((typeof subtype.value === "function" && subtype.value(json[subtype.property])) || (typeof subtype.value !== "function" && json[subtype.property] === subtype.value))) {
                matchedType = (0, resolveForwardRef_js_1.resolveForwardRef)(subtype.type);
            }
            if (matchedType && matchedType !== this) {
                if (matchedType.hasOwnProperty("fromJSON")) {
                    return matchedType.fromJSON(json, options);
                }
                instance = new matchedType;
                break;
            }
        }
    }
    if (!instance) {
        instance = new this();
    }
    const prototypesTree = (0, getPrototypesTree_js_1.getPrototypesTree)(instance);
    const typesTree = getTypesTree(prototypesTree);
    const serializationOptions = { typeProviders: [].concat(options?.typeProviders ?? [], typesTree[0].__jsonTypes ?? []) };
    const properties = getDeclaredProperties(instance, typesTree);
    // property names that already unserialized
    const unserializedProperties = [];
    // unserialize known properties
    for (const propertyName in properties) {
        const config = properties[propertyName];
        const name = config.propertyJsonName ? config.propertyJsonName : propertyName;
        if (name in json) {
            const value = json[name];
            if (typeof value === "function") {
                continue;
            }
            if (Array.isArray(value)) {
                const serializer = config.propertyType instanceof Serializer_js_1.Serializer ? config.propertyType : (config.propertyType && (0, findTypeSerializer_js_1.findTypeSerializer)(config.propertyType, serializationOptions.typeProviders));
                if (serializer instanceof ArraySerializer_js_1.ArraySerializer) {
                    instance[propertyName] = serializer.unserialize(value, serializationOptions);
                }
                else {
                    instance[propertyName] = [];
                    for (const i of value) {
                        instance[propertyName].push(serializer ? serializer.unserialize(i, serializationOptions) : (0, unserializeImpl_js_1.unserializeImpl)(i, config.propertyType, serializationOptions));
                    }
                }
            }
            else {
                const type = (config.propertyType || config.propertyDesignType) ?? (0, identifyType_js_1.identifyType)(value);
                const serializer = config.propertyType instanceof Serializer_js_1.Serializer ? config.propertyType : (0, findTypeSerializer_js_1.findTypeSerializer)(type, serializationOptions.typeProviders);
                instance[propertyName] = serializer ? serializer.unserialize(value, serializationOptions) : (0, unserializeImpl_js_1.unserializeImpl)(value, type, serializationOptions);
            }
            unserializedProperties.push(name);
        }
    }
    // copy json properties, that were not unserialized above
    for (const propertyName in json) {
        if (propertyName === "@type" && typesTree[0].jsonTypeName) {
            continue;
        }
        if (unserializedProperties.indexOf(propertyName) < 0) {
            instance[propertyName] = (0, unserializeImpl_js_1.unserializeImpl)(json[propertyName], null, serializationOptions);
        }
    }
    return instance;
}
function getTypesTree(prototypes) {
    return prototypes.map(type => type.constructor);
}
function getDeclaredProperties(thiz, types) {
    let properties = {};
    for (let t = types.length - 1; t >= 0; t--) {
        const internalType = types[t];
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
//# sourceMappingURL=toFromJsonImpl.js.map