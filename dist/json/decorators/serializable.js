import { getSupertypes } from "../getSupertypes.js";
import { setupSerialization } from "../setupSerialization.js";
/**
 * Decorator that marks a class as serializable.
 *
 * It allows preserving the class type information during JSON conversion,
 * enabling full reconstruction of instances including methods and hierarchy.
 *
 * If the project uses `TsTransformer`, property metadata is injected automatically.
 * Otherwise, properties must be manually defined in the `options`.
 *
 * @param options Optional serialization configuration.
 *
 * @example
 * ```typescript
 * @serializable()
 * class User {
 *   name: string;
 * }
 * ```
 */
export function serializable(options) {
    // when TsTransformer used, there can be up to 2 arguments
    // second argument is default options map, so we have to marge it
    if (arguments.length === 2) {
        options = Object.assign({}, options);
        for (let i = arguments.length - 1; i >= 0; i--) {
            options.properties = Object.assign(arguments[1].properties, options.properties);
        }
    }
    return function (classType) {
        setupSerialization(classType);
        const classInternalType = classType;
        if (options?.properties) {
            const properties = classInternalType.__jsonProperties = (classInternalType.hasOwnProperty("__jsonProperties") && classInternalType.__jsonProperties) || {};
            for (const propertyName of Object.keys(options.properties)) {
                if (!(propertyName in properties)) {
                    properties[propertyName] = options.properties[propertyName];
                }
            }
        }
        if (options?.types) {
            classInternalType.__jsonTypes = (classInternalType.hasOwnProperty("__jsonTypes") && classInternalType.__jsonTypes) || [];
            for (const types of options.types) {
                for (const type of Array.isArray(types) ? types : [types]) {
                    if (type.jsonTypeName) {
                        classInternalType.__jsonTypes.push({ name: type.jsonTypeName, type: type });
                    }
                    else {
                        classInternalType.__jsonTypes.push(type);
                    }
                }
            }
        }
        if (classInternalType.hasOwnProperty("jsonTypeName") && classInternalType.jsonTypeName) {
            for (const supertype of getSupertypes(classInternalType)) {
                if (supertype.hasOwnProperty("__jsonSerialization") && supertype.__jsonSerialization) {
                    const types = supertype.__jsonSubtypes = (supertype.hasOwnProperty("__jsonSubtypes") && supertype.__jsonSubtypes) || [];
                    types.push({
                        type: classType,
                        property: "@type",
                        value: classInternalType.jsonTypeName
                    });
                }
            }
        }
    };
}
//# sourceMappingURL=serializable.js.map