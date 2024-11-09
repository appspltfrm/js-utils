import { unserializeImpl } from "./unserializeImpl.js";
export function unserialize(json, targetClass, options) {
    if (json === undefined || json === null) {
        return json;
    }
    return unserializeImpl(json, targetClass, options);
}
//# sourceMappingURL=unserialize.js.map