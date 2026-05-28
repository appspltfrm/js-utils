import { Type } from "../core/Type.js";
import { FromJsonType } from "./FromJsonType.js";
import { SerializationOptions } from "./SerializationOptions.js";
import { Serializer } from "./Serializer.js";
export interface PropertyConfig extends SerializationOptions {
    propertyType?: Type<any> | FromJsonType<any> | Serializer;
    propertyDesignType?: Type<any>;
    propertyJsonName?: string;
}
