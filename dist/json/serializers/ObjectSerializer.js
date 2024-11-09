import { findTypeSerializer } from "../findTypeSerializer.js";
import { serializeImpl } from "../serializeImpl.js";
import { Serializer } from "../Serializer.js";
import { unserializeImpl } from "../unserializeImpl.js";
/**
 * Basic serializer.
 */
export class ObjectSerializer extends Serializer {
    constructor(type) {
        super();
        if (type && type !== Object && type !== Array) {
            this.type = type;
        }
    }
    type;
    serialize(object, options) {
        return serializeImpl(object, this.type, options);
    }
    unserialize(json, options) {
        return unserializeImpl(json, this.type, options);
    }
}
(function (ObjectSerializer) {
    ObjectSerializer.instance = new ObjectSerializer();
    function getTypeSerializer(type, typeProviders) {
        const serializer = findTypeSerializer(type, typeProviders);
        if (serializer) {
            return serializer;
        }
        else {
            return new ObjectSerializer(type);
        }
    }
    ObjectSerializer.getTypeSerializer = getTypeSerializer;
})(ObjectSerializer || (ObjectSerializer = {}));
//# sourceMappingURL=ObjectSerializer.js.map