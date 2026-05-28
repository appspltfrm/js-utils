import { deepMerge } from "./_deepMerge.js";
export function merge(deep, ...objects) {
    if (deep) {
        return deepMerge(...objects);
    }
    else {
        return Object.assign({}, ...objects);
    }
}
//# sourceMappingURL=_merge.js.map