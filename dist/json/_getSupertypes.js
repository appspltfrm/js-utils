import { getPrototypesTree } from "./_getPrototypesTree.js";
export function getSupertypes(type) {
    return getPrototypesTree(type.prototype).map(type => type.constructor);
}
//# sourceMappingURL=_getSupertypes.js.map