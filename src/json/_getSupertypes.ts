import {Type} from "../core/Type.js";
import {getPrototypesTree} from "./_getPrototypesTree.js";
import {InternalType} from "./_InternalType.js";

export function getSupertypes(type: Type): Array<Type & InternalType> {
  return getPrototypesTree(type.prototype).map(type => type.constructor);
}
