import { Type } from "../../core/Type.js";
import { JsonTypeName } from "../JsonTypeName.js";
import { TypeProvider } from "../TypeProvider.js";
import { PropertyConfig } from "./PropertyConfig.js";
/**
 * Dekorator oznaczający klasę jako serializowalną.
 * Pozwala na zachowanie informacji o typie klasy podczas konwersji do formatu JSON.
 *
 * Jeśli projekt korzysta z `TsTransformer`, metadane o polach są wstrzykiwane automatycznie.
 * W przeciwnym razie należy je zdefiniować w `options`.
 *
 * @param options Konfiguracja serializacji (opcjonalna przy użyciu TsTransformera).
 */
export declare function serializable(options?: JsonSerializableOptions): (classType: Type) => void;
type Types = Array<TypeProvider | TypeProvider[] | (Type & JsonTypeName) | Types>;
type Properties = {
    [propertyName: string]: PropertyConfig;
};
export interface JsonSerializableOptions {
    types?: Types;
    properties?: Properties | "*";
}
export {};
