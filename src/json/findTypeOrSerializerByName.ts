import {Type} from "../core/Type.js";
import {globalProviders} from "./globalProviders.js";
import {Serializer} from "./Serializer.js";
import {TypeNameProvider, TypeNameSerializerProvider, TypeProviders, TypeWithJsonTypeName} from "./TypeProvider.js";

export function findTypeOrSerializerByName(name: string | {"@type": string}, typeProviders?: TypeProviders): Type | Serializer {

    if (typeof name === "object") {
        if (typeof name?.["@type"] !== "string") {
            return undefined;
        }

        name = name["@type"];
    }

    if (name) {

        if (typeProviders) {
            for (const provider of typeProviders) {
                if (Array.isArray(provider)) {
                    const result = findTypeOrSerializerByName(name, provider);
                    if (result) {
                        return result;
                    }

                } else if ((provider as TypeWithJsonTypeName).jsonTypeName === name) {
                    return provider as TypeWithJsonTypeName;

                } else if ((provider as TypeNameProvider | TypeNameSerializerProvider).name === name) {
                    return (provider as TypeNameSerializerProvider).serializer || (provider as TypeNameProvider).type;
                }
            }
        }

        for (const provider of globalProviders) {
            if ((provider as TypeWithJsonTypeName).jsonTypeName === name) {
                return provider as TypeWithJsonTypeName;
            } else if (provider.name === name) {
                return provider.serializer || provider.type;
            }
        }
    }
}
