import { Type } from "../core/Type.js";
import { Serializer } from "./Serializer.js";
import { TypeProviders } from "./TypeProvider.js";
export declare function findTypeOrSerializerByName(name: string | {
    "@type": string;
}, typeProviders?: TypeProviders): Type | Serializer;
