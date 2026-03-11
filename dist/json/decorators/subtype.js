import { setupSerialization } from "../setupSerialization.js";
/**
 * Dekorator wspierający polimorfizm podczas deserializacji.
 * Pozwala powiązać klasę potomną z klasą bazową na podstawie określonego warunku (matcher lub para pole=wartość).
 *
 * @param supertype Klasa bazowa.
 * @param propertyOrMatcher Nazwa pola w JSON lub funkcja sprawdzająca (matcher).
 * @param value Wartość pola, która identyfikuje tę podklasę.
 */
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