import { Serializer } from "../Serializer.js";
import { setupSerialization } from "../setupSerialization.js";
import "reflect-metadata";
/**
 * Dekorator definiujący właściwości pola podczas serializacji.
 * Pozwala określić typ pola, jego nazwę w formacie JSON oraz dodatkowe opcje.
 *
 * @param type Klasa lub Serializer używany do obsługi tego pola.
 * @param jsonName Opcjonalna nazwa pola w JSON (jeśli inna niż w klasie).
 * @param options Dodatkowe opcje serializacji.
 */
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
            propertyDesignType: !jsonType ? Reflect.getMetadata("design:type", classPrototype, propertyName) : undefined,
            propertyJsonName: jsonName
        }, options);
        setupSerialization(type);
        const properties = type.__jsonProperties = (type.hasOwnProperty("__jsonProperties") && type.__jsonProperties) || {};
        properties[propertyName] = config;
    };
}
//# sourceMappingURL=property.js.map