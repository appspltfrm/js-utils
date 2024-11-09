import { Type } from "../../core/Type.js";
import { JsonTypeName } from "../JsonTypeName.js";
import { RegisterGlobalProviderOptions } from "../registerGlobalProvider.js";
export declare function globalType(options?: RegisterGlobalProviderOptions): (classType: Type & JsonTypeName) => void;
