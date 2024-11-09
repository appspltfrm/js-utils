import { Type } from "../core/Type.js";
import { Serializer } from "./Serializer.js";
import { TypeProviders } from "./TypeProvider.js";
export declare function findTypeSerializer(type: Type, typeProviders?: TypeProviders): Serializer;
