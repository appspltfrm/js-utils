import { setupSerialization } from "../setupSerialization.js";
export function subtype(supertype, propertyOrMatcher, value) {
    return function (classType) {
        setupSerialization(supertype);
        const internalType = supertype;
        const types = internalType.__jsonSubtypes = (internalType.hasOwnProperty("__jsonSubtypes") && internalType.__jsonSubtypes) || [];
        types.push({
            type: classType,
            property: typeof propertyOrMatcher === "string" ? propertyOrMatcher : undefined,
            value: value,
            matcher: typeof propertyOrMatcher === "function" ? propertyOrMatcher : undefined
        });
    };
}
//# sourceMappingURL=subtype.js.map