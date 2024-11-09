import {TypeProvider} from "./TypeProvider.js";

export interface SerializationOptions {
    notStrict?: boolean;
    disallowUndefinedOrNull?: boolean;
    ignoreErrors?: boolean;
    typeProviders?: TypeProvider[];
    [propName: string]: any;
}
