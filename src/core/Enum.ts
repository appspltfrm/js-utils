import {TypedJson} from "../json/TypedJson.js";
import {Type} from "./Type.js";

export interface EnumStatic<T> {
    fromJSON(value: EnumFromJSONValue, unknownFactory?: (value: EnumFromJSONValue) => T): T;
    values(): T[];
    valueOf(name: EnumValueOfValue, unknownFactory?: (name: EnumValueOfValue) => T): T;
}

export interface EnumValueJson<TypeOfEnumClass = any> extends TypedJson {
    name: TypeOfEnumClass extends EnumStatic<any> ? EnumValueName<TypeOfEnumClass> : string;
}

type FunctionKeys<T> = {[K in keyof T]: T[K] extends Function ? K : never}[keyof T];
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
export abstract class Enum {

    /**
     * Zwraca listę wszystkich zarejestrowanych wartości dla danego Enuma.
     */
    protected static values(): Enum[] {
        return valuesRef(this).slice();
    }

    /**
     * Tworzy instancję Enuma na podstawie wartości JSON (string lub obiekt z polem name).
     */
    protected static fromJSON(value: EnumFromJSONValue, unknownFactory?: (value: EnumFromJSONValue) => Enum): Enum {

        let name: string | undefined;

        if (typeof value === "string") {
            name = value;
        } else if (typeof value === "object" && typeof value?.name === "string") {
            name = value.name;
        }

        if (name) {
            for (const v of valuesRef(this)) {
                if (v.name === name) {
                    return v;
                }
            }
        }

        if (unknownFactory) {
            return unknownFactory(value);
        }

        throw new Error("Invalid value " + JSON.stringify(value) + " for enum " + jsonTypeName(this));
    }

    /**
     * Zwraca instancję Enuma na podstawie nazwy.
     * @throws Błąd, jeśli nazwa nie odpowiada żadnej zdefiniowanej wartości.
     */
    protected static valueOf(name: EnumValueOfValue, unknownFactory?: (name: EnumValueOfValue) => Enum): Enum {

        CHECK_NAME: if (name) {

            if (typeof name === "object" && name) {
                if (name["@type"] === jsonTypeName(this)) {
                    name = name.name;
                } else {
                    break CHECK_NAME;
                }
            }

            for (const v of valuesRef(this)) {
                if (v.name === name) {
                    return v;
                }
            }
        }

        if (unknownFactory) {
            return unknownFactory(name);
        }

        throw new Error("Invalid value " + JSON.stringify(name) + " for enum " + this.name);
    }

    protected constructor(public readonly name: string) {
        addValue(this.constructor, this as any);
    }

    /**
     * Porównuje obecną wartość Enuma z inną wartością (string, Enum lub JSON).
     */
    equals(value: string | Enum | EnumValueJson): boolean {

        if (value === null || value === undefined || typeof value === "function" || typeof value === "number" || typeof value === "boolean") {
            return false;
        } if (typeof value === "string") {
            return value === this.name;
        } else if ("@type" in value) {
            return value["@type"] === jsonTypeName(this) && value.name === this.name;
        } else if (value.constructor === this.constructor) {
            return value.name === this.name;
        }

        return false;
    }

    toJSON(): any {
        return {"@type": jsonTypeName(this), name: this.name};
    }
}

function addValue<EnumClass extends Enum>(enumClass: Type<EnumClass>, value: EnumClass) {
    valuesRef(enumClass).push(value);
}

const enumValuesProp = Symbol("@appspltfrm/js-utils/core/Enum:values")

function valuesRef<EnumClass extends Enum>(enumClass: Type<EnumClass>): EnumClass[] {
    const cl = enumClass as any;
    if (!cl[enumValuesProp]) {
        cl[enumValuesProp] = [];
    }

    return cl[enumValuesProp];
}

function jsonTypeName(instanceOrClass: Type | Enum): string {

    let type: Type & {jsonTypeName?: string};

    if (instanceOrClass instanceof Enum) {
        type = instanceOrClass.constructor;
    } else {
        type = instanceOrClass;
    }

    return type.jsonTypeName || type.name;
}
