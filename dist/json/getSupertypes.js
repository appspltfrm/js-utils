import { getPrototypesTree } from "./getPrototypesTree.js";
export function getSupertypes(type) {
    return getPrototypesTree(type.prototype).map(type => type.constructor);
}
//# sourceMappingURL=getSupertypes.js.map