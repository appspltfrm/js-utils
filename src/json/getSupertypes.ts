import {Type} from "../core/Type.js";
import {getPrototypesTree} from "./getPrototypesTree.js";
import {InternalType} from "./InternalType.js";

export function getSupertypes(type: Type): Array<Type & InternalType> {
    return getPrototypesTree(type.prototype).map(type => type.constructor);
}
