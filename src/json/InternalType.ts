import {Type} from "../core/Type.js";
import {PropertyConfig} from "./decorators/PropertyConfig.js";
import {SerializationOptions} from "./SerializationOptions.js";
import {SubtypeInfo} from "./SubtypeInfo.js";
import {TypeProvider} from "./TypeProvider.js";

export interface InternalType<T = any> extends Type<T> {
    __jsonSerialization?: boolean;
    __jsonToJson?: boolean;
    __jsonFromJson?: boolean;
    __jsonProperties?: {[propertyName: string]: PropertyConfig};
    __jsonIgnoredProperties?: string[];
    __jsonSubtypes?: SubtypeInfo[];
    __jsonTypes?: Array<TypeProvider>;
    jsonTypeName?: string;
    fromJSON?: (json: any, options?: SerializationOptions) => T;
}

export type InternalTypeProps = keyof InternalType;
