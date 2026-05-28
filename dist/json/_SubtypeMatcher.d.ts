import { Type } from "../core/Type.js";
import { ForwardRefFn } from "../core/forwardRef.js";
export type SubtypeMatcher = (json: any) => Type | ForwardRefFn;
