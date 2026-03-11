import { TypedJson } from "../json/TypedJson.js";
export interface EnumStatic<T> {
    fromJSON(value: EnumFromJSONValue, unknownFactory?: (value: EnumFromJSONValue) => T): T;
    values(): T[];
    valueOf(name: EnumValueOfValue, unknownFactory?: (name: EnumValueOfValue) => T): T;
}
export interface EnumValueJson<TypeOfEnumClass = any> extends TypedJson {
    name: TypeOfEnumClass extends EnumStatic<any> ? EnumValueName<TypeOfEnumClass> : string;
}
type FunctionKeys<T> = {
    [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];
type OmitFunctions<T> = Omit<T, FunctionKeys<T>>;
export type EnumFromJSONValue = string | EnumValueJson | any;
export type EnumValueOfValue = string | EnumValueJson;
export type EnumStaticName<TypeOfEnumClass extends EnumStatic<any>> = Extract<Exclude<keyof TypeOfEnumClass, "prototype" | "values" | "fromJSON" | "valueOf" | "jsonTypeName">, string>;
export type EnumValueName<TypeOfEnumClass extends EnumStatic<any>> = Extract<Exclude<keyof OmitFunctions<TypeOfEnumClass>, "prototype" | "jsonTypeName">, string>;
/**
 * Zaawansowana klasa bazowa dla typów wyliczeniowych w TypeScript.
 * Rozwiązuje problemy ze standardowymi enumami, oferując pełną obiektowość i łatwą serializację.
 *
 * Przykład użycia:
 * ```typescript
 * class UserRole extends Enum {
 *   static readonly ADMIN = new UserRole("ADMIN");
 *   static readonly USER = new UserRole("USER");
 * }
 * ```
 */
export declare abstract class Enum {
    readonly name: string;
    /**
     * Zwraca listę wszystkich zarejestrowanych wartości dla danego Enuma.
     */
    protected static values(): Enum[];
    /**
     * Tworzy instancję Enuma na podstawie wartości JSON (string lub obiekt z polem name).
     */
    protected static fromJSON(value: EnumFromJSONValue, unknownFactory?: (value: EnumFromJSONValue) => Enum): Enum;
    /**
     * Zwraca instancję Enuma na podstawie nazwy.
     * @throws Błąd, jeśli nazwa nie odpowiada żadnej zdefiniowanej wartości.
     */
    protected static valueOf(name: EnumValueOfValue, unknownFactory?: (name: EnumValueOfValue) => Enum): Enum;
    protected constructor(name: string);
    /**
     * Porównuje obecną wartość Enuma z inną wartością (string, Enum lub JSON).
     */
    equals(value: string | Enum | EnumValueJson): boolean;
    toJSON(): any;
}
export {};
