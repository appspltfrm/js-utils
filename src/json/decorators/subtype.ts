import {Type} from "../../core/Type.js";
import {InternalType} from "../InternalType.js";
import {setupSerialization} from "../setupSerialization.js";
import {SubtypeMatcher} from "../SubtypeMatcher.js";

type Fn = (classType: Type) => void;

export function subtype(supertype: Type, matcher: SubtypeMatcher): Fn;

export function subtype(supertype: Type, property: string, value: any): Fn;

/**
 * Dekorator wspierający polimorfizm podczas deserializacji.
 * Pozwala powiązać klasę potomną z klasą bazową na podstawie określonego warunku (matcher lub para pole=wartość).
 * 
 * @param supertype Klasa bazowa.
 * @param propertyOrMatcher Nazwa pola w JSON lub funkcja sprawdzająca (matcher).
 * @param value Wartość pola, która identyfikuje tę podklasę.
 */
export function subtype(supertype: Type, propertyOrMatcher: string | SubtypeMatcher, value?: any): Fn {
    return function (classType: Type) {
        setupSerialization(supertype);

        const internalType = supertype as InternalType;

        const types = internalType.__jsonSubtypes = (internalType.hasOwnProperty("__jsonSubtypes") && internalType.__jsonSubtypes) || [];

        types.push({
            type: classType,
            property: typeof propertyOrMatcher === "string" ? propertyOrMatcher : undefined,
            value: value,
            matcher: typeof propertyOrMatcher === "function" ? propertyOrMatcher : undefined
        });
    }
}
