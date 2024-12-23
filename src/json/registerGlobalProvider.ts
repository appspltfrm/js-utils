import {globalProviders} from "./globalProviders.js";
import {InternalTypeProvider, TypeProvider, TypeProviders} from "./TypeProvider.js";

export function registerGlobalProvider(provider: TypeProvider, options?: RegisterGlobalProviderOptions) {

    const internal = provider as InternalTypeProvider;

    const existing = globalProviders.findIndex(glob =>
        (internal.name && glob.name === internal.name &&
            (
                (!!glob.serializer && !!internal.serializer) ||
                (!glob.serializer && !internal.serializer && !!glob.type && !!internal.type)
            )
        ) || (!internal.name && !glob.name && internal.type && glob.type && glob.type === internal.type));

    if (existing > -1 && !options?.replace) {
        throw new Error("Global provider already exists: " + JSON.stringify(internal));
    }

    if (existing > -1) {
        globalProviders[existing] = internal;
    } else {
        globalProviders.push(internal);
    }
}

export function registerGlobalProviders(providers: TypeProviders, options?: RegisterGlobalProviderOptions) {
    for (const provider of providers) {
        if (Array.isArray(provider)) {
            registerGlobalProviders(provider);
        } else {
            registerGlobalProvider(provider, options);
        }
    }
}

export interface RegisterGlobalProviderOptions {
    replace?: boolean;
}
