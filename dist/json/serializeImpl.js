import { findTypeSerializer } from "./findTypeSerializer.js";
import { identifyType } from "./identifyType.js";
import { Serializer } from "./Serializer.js";
export function serializeImpl(value, type, options) {
    return serializeImplWithSerializer(value, type, null, options);
}
function serializeImplWithSerializer(value, type, typeSerializer, options) {
    if (value === null || value === undefined) {
        return value;
    }
    else {
        const newArray = Array.isArray(value) ? [] : undefined;
        const serializer = typeSerializer instanceof Serializer ? typeSerializer : (typeSerializer !== false && findTypeSerializer(type ? type : (!newArray ? identifyType(value) : undefined), options?.typeProviders));
        for (const i of newArray ? value : [value]) {
            if (newArray && (i === undefined || i === null)) {
                newArray.push(i);
                continue;
            }
            let serialized = i;
            if (Array.isArray(i)) {
                serialized = serializeImplWithSerializer(i, type, serializer || false, options);
            }
            else if (serializer) {
                serialized = serializer.serialize(i, options);
            }
            else if (newArray) {
                serialized = serializeImpl(i, undefined, options);
            }
            else if (i.toJSON) {
                serialized = i.toJSON(options);
            }
            else if (typeof i === "object") {
                serialized = {};
                for (const p of Object.keys(i)) {
                    serialized[p] = serializeImpl(i[p], undefined, options);
                }
            }
            if (newArray) {
                newArray.push(serialized);
            }
            else {
                return serialized;
            }
        }
        if (newArray) {
            return newArray;
        }
    }
}
//# sourceMappingURL=serializeImpl.js.map