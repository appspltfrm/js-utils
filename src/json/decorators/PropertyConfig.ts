import {Type} from "../../core/Type.js";
import {SerializationOptions} from "../SerializationOptions.js";
import {Serializer} from "../Serializer.js";

export interface PropertyConfig extends SerializationOptions {
    propertyType?: Type<any> | Serializer;
    propertyDesignType?: Type<any>;
    propertyJsonName?: string;
}
