import { deepMerge } from "./deepMerge.js";
export function merge(deep, ...objects) {
    if (deep) {
        return deepMerge(...objects);
    }
    else {
        return Object.assign({}, ...objects);
    }
}
//# sourceMappingURL=merge.js.map