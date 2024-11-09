"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerGlobalProvider = registerGlobalProvider;
exports.registerGlobalProviders = registerGlobalProviders;
const globalProviders_js_1 = require("./globalProviders.js");
function registerGlobalProvider(provider, options) {
    const internal = provider;
    const existing = globalProviders_js_1.globalProviders.findIndex(glob => (internal.name && glob.name === internal.name &&
        ((!!glob.serializer && !!internal.serializer) ||
            (!glob.serializer && !internal.serializer && !!glob.type && !!internal.type))) || (!internal.name && !glob.name && internal.type && glob.type && glob.type === internal.type));
    if (existing > -1 && !options?.replace) {
        throw new Error("Global provider already exists: " + JSON.stringify(internal));
    }
    if (existing > -1) {
        globalProviders_js_1.globalProviders[existing] = internal;
    }
    else {
        globalProviders_js_1.globalProviders.push(internal);
    }
}
function registerGlobalProviders(providers, options) {
    for (const provider of providers) {
        if (Array.isArray(provider)) {
            registerGlobalProviders(provider);
        }
        else {
            registerGlobalProvider(provider, options);
        }
    }
}
//# sourceMappingURL=registerGlobalProvider.js.map