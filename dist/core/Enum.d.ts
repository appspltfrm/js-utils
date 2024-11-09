import { TypedJson } from "../json/TypedJson.js";
export interface EnumStatic<T> {
    fromJSON(value: EnumFromJSONValue, unknownFactory?: (value: EnumFromJSONValue) => T): T;
    values(): T[];
    valueOf(name: EnumValueOfValue, unknownFactory?: (name: EnumValueOfValue) => T): T;
}
export interface EnumValueJson<TypeOfEnumClass = any> extends TypedJson {
    name: TypeOfEnumClass extends EnumStatic<any> ? EnumValueName<TypeOfEnumClass> : string;
}
export type EnumFromJSONValue = string | EnumValueJson | any;
export type EnumValueOfValue = string | EnumValueJson;
export type EnumValueName<TypeOfEnumClass extends EnumStatic<any>> = Extract<Exclude<keyof TypeOfEnumClass, "prototype" | "values" | "fromJSON" | "valueOf" | "jsonTypeName">, string>;
export declare abstract class Enum {
    readonly name: string;
    protected static values(): Enum[];
    protected static fromJSON(value: EnumFromJSONValue, unknownFactory?: (value: EnumFromJSONValue) => Enum): Enum;
    protected static valueOf(name: EnumValueOfValue, unknownFactory?: (name: EnumValueOfValue) => Enum): Enum;
    protected constructor(name: string);
    equals(value: string | Enum | EnumValueJson): boolean;
    toJSON(): any;
}
