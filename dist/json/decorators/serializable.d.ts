import { Type } from "../../core/Type.js";
import { JsonTypeName } from "../JsonTypeName.js";
import { TypeProvider } from "../TypeProvider.js";
import { PropertyConfig } from "./PropertyConfig.js";
export declare function serializable(options?: JsonSerializableOptions): (classType: Type) => void;
type Types = Array<TypeProvider | TypeProvider[] | (Type & JsonTypeName) | Types>;
type Properties = {
    [propertyName: string]: PropertyConfig;
};
export interface JsonSerializableOptions {
    types?: Types;
    properties?: Properties | "*";
}
export {};
