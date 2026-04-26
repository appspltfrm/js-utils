import { unserializeImpl } from "./unserializeImpl.js";
/**
 * Reconstructs (hydrates) a JSON object back into a class instance.
 *
 * It uses `@type` metadata in the JSON or the provided `targetClass` to determine
 * which class to instantiate, including restoring methods and property types.
 *
 * @param json The JSON data to unserialize.
 * @param targetClass Optional class to use if `@type` is not present in the JSON.
 * @param options Optional serialization settings.
 * @returns A class instance or original primitive.
 *
 * @example
 * ```typescript
 * const user = unserialize(json, User);
 * console.log(user instanceof User); // true
 * ```
 */
export function unserialize(json, targetClass, options) {
    if (json === undefined || json === null) {
        return json;
    }
    return unserializeImpl(json, targetClass, options);
}
//# sourceMappingURL=unserialize.js.map