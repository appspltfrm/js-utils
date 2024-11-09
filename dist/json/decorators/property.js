import { Serializer } from "../Serializer.js";
import { setupSerialization } from "../setupSerialization.js";
import "reflect-metadata";
export function property() {
    let jsonType;
    let jsonName;
    let options;
    for (let i = 0; i < arguments.length; i++) {
        if (arguments[i] instanceof Serializer || typeof arguments[i] === "function") {
            jsonType = arguments[i];
        }
        else if (typeof arguments[i] === "string") {
            jsonName = arguments[i];
        }
        else if (arguments[i] && typeof arguments[i] === "object") {
            options = arguments[i];
        }
    }
    return function (classPrototype, propertyName, propertyDescriptor) {
        const type = classPrototype.constructor;
        const config = Object.assign({
            propertyType: jsonType,
            propertyDesignType: !jsonType && Reflect.getMetadata("design:type", classPrototype, propertyName),
            propertyJsonName: jsonName
        }, options);
        setupSerialization(type);
        const properties = type.__jsonProperties = (type.hasOwnProperty("__jsonProperties") && type.__jsonProperties) || {};
        properties[propertyName] = config;
    };
}
//# sourceMappingURL=property.js.map