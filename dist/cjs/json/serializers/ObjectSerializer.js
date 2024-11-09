"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectSerializer = void 0;
const findTypeSerializer_js_1 = require("../findTypeSerializer.js");
const serializeImpl_js_1 = require("../serializeImpl.js");
const Serializer_js_1 = require("../Serializer.js");
const unserializeImpl_js_1 = require("../unserializeImpl.js");
/**
 * Basic serializer.
 */
class ObjectSerializer extends Serializer_js_1.Serializer {
    constructor(type) {
        super();
        if (type && type !== Object && type !== Array) {
            this.type = type;
        }
    }
    type;
    serialize(object, options) {
        return (0, serializeImpl_js_1.serializeImpl)(object, this.type, options);
    }
    unserialize(json, options) {
        return (0, unserializeImpl_js_1.unserializeImpl)(json, this.type, options);
    }
}
exports.ObjectSerializer = ObjectSerializer;
(function (ObjectSerializer) {
    ObjectSerializer.instance = new ObjectSerializer();
    function getTypeSerializer(type, typeProviders) {
        const serializer = (0, findTypeSerializer_js_1.findTypeSerializer)(type, typeProviders);
        if (serializer) {
            return serializer;
        }
        else {
            return new ObjectSerializer(type);
        }
    }
    ObjectSerializer.getTypeSerializer = getTypeSerializer;
})(ObjectSerializer || (exports.ObjectSerializer = ObjectSerializer = {}));
//# sourceMappingURL=ObjectSerializer.js.map