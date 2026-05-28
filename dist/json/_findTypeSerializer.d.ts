import { Type } from "../core/Type.js";
import { FromJsonType } from "./FromJsonType.js";
import { Serializer } from "./Serializer.js";
import { TypeProviders } from "./TypeProvider.js";
export declare function findTypeSerializer(type: Type | FromJsonType | undefined, typeProviders?: TypeProviders): Serializer | undefined;
