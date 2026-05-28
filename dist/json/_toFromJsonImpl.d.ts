import { AssignableType } from "../core/Type.js";
import { SerializationOptions } from "./SerializationOptions.js";
export declare function toJsonImpl(this: any, options?: SerializationOptions): any;
export declare function fromJsonImpl(this: AssignableType, json: any, options?: SerializationOptions): any;
