import { globalProviders } from "./globalProviders.js";
export function findTypeSerializer(type, typeProviders) {
    if (!type || type === Object || type === Array) {
        return;
    }
    if (typeProviders) {
        for (const provider of typeProviders) {
            if (Array.isArray(provider)) {
                const result = findTypeSerializer(type, provider);
                if (result) {
                    return result;
                }
            }
            else if (provider.type === type && provider.serializer) {
                return provider.serializer;
            }
        }
    }
    for (const provider of globalProviders) {
        if (provider.type === type && provider.serializer) {
            return provider.serializer;
        }
    }
}
//# sourceMappingURL=findTypeSerializer.js.map