import { setupSerialization } from "../setupSerialization.js";
/**
 * Decorator that supports polymorphism during unserialization.
 * Handles various overloads to provide a flexible API.
 */
export function subtype(supertype, propertyOrMatcher, value) {
    return function (classType) {
        setupSerialization(supertype);
        const internalType = supertype;
        const types = internalType.__jsonSubtypes = (internalType.hasOwnProperty("__jsonSubtypes") && internalType.__jsonSubtypes) || [];
        let property = typeof propertyOrMatcher === "string" ? propertyOrMatcher : undefined;
        let actualValue = value;
        let matcher = typeof propertyOrMatcher === "function" ? propertyOrMatcher : undefined;
        if (propertyOrMatcher === undefined) {
            const classWithJsonTypeName = classType;
            if (classWithJsonTypeName.jsonTypeName) {
                property = "@type";
                actualValue = classWithJsonTypeName.jsonTypeName;
            }
        }
        types.push({
            type: classType,
            property: property,
            value: actualValue,
            matcher: matcher
        });
    };
}
//# sourceMappingURL=subtype.js.map