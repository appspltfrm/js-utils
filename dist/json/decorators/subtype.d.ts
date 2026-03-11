import { Type } from "../../core/Type.js";
import { SubtypeMatcher } from "../SubtypeMatcher.js";
type Fn = (classType: Type) => void;
export declare function subtype(supertype: Type, matcher: SubtypeMatcher): Fn;
export declare function subtype(supertype: Type, property: string, value: any): Fn;
export {};
