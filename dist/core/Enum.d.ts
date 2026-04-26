import { TypedJson } from "../json/TypedJson.js";
/**
 * Static methods available on Enum classes.
 */
export interface EnumStatic<T> {
    /**
       * Creates an enum instance from a JSON value.
       * @param value The JSON value (string or object).
       * @param unknownFactory Optional factory for handling unknown values.
       */
    fromJSON(value: EnumFromJSONValue, unknownFactory?: (value: EnumFromJSONValue) => T): T;
    /**
       * Returns all registered values of the enum.
       */
    values(): T[];
    /**
       * Returns an enum instance by its name.
       * @param name The name of the enum value.
       * @param unknownFactory Optional factory for handling unknown names.
       */
    valueOf(name: EnumValueOfValue, unknownFactory?: (name: EnumValueOfValue) => T): T;
}
/**
 * JSON representation of an enum value.
 */
export interface EnumValueJson<TypeOfEnumClass = any> extends TypedJson {
    /**
       * The name of the enum constant.
       */
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
 * An advanced base class for enumerated types in TypeScript.
 *
 * Unlike standard TypeScript enums, these are full-fledged objects, allowing for
 * better type safety, methods, and seamless JSON serialization.
 *
 * @example
 * ```typescript
 * class UserRole extends Enum {
 *   static readonly ADMIN = new UserRole("ADMIN");
 *   static readonly USER = new UserRole("USER");
 * }
 *
 * const role = UserRole.valueOf("ADMIN");
 * console.log(role === UserRole.ADMIN); // true
 * ```
 */
export declare abstract class Enum {
    readonly name: string;
    /**
       * Returns a list of all registered values for this enum class.
       * This method is protected and should be exposed via a public static method in subclasses.
       */
    protected static values(): Enum[];
    /**
       * Creates an enum instance from a JSON value (either a string or an object with a `name` property).
       * This method is protected and should be exposed via a public static method in subclasses.
       *
       * @param value The JSON value to parse.
       * @param unknownFactory Optional factory function to handle unknown values.
       * @returns The matching enum instance.
       * @throws Error if the value is invalid and no unknownFactory is provided.
       */
    protected static fromJSON(value: EnumFromJSONValue, unknownFactory?: (value: EnumFromJSONValue) => Enum): Enum;
    /**
       * Returns an enum instance by its name.
       * This method is protected and should be exposed via a public static method in subclasses.
       *
       * @param name The name of the enum value (string or JSON object).
       * @param unknownFactory Optional factory function to handle unknown names.
       * @returns The matching enum instance.
       * @throws Error if the name is invalid and no unknownFactory is provided.
       */
    protected static valueOf(name: EnumValueOfValue, unknownFactory?: (name: EnumValueOfValue) => Enum): Enum;
    /**
       * Creates a new enum constant.
       * @param name The unique name of the enum constant.
       */
    protected constructor(name: string);
    /**
       * Compares the current enum value with another value.
       * Supports comparison with strings (names), other Enum instances, or JSON representations.
       *
       * @param value The value to compare against.
       * @returns `true` if values match, `false` otherwise.
       */
    equals(value: string | Enum | EnumValueJson): boolean;
    /**
       * Converts the enum instance to a JSON-serializable object.
       */
    toJSON(): any;
}
export {};
