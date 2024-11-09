/**
 * Represents a type that a Component or other object is instances of.
 *
 * An example of a `Type` is `MyCustomComponent` class, which in JavaScript is be represented by
 * the `MyCustomComponent` constructor function.
 *
 * @stable
 */
interface FunctionConstructor {
    /**
      * Creates a new function.
      * @param args A list of arguments the function accepts.
      */
    new (...args: string[]): Function;
    (...args: string[]): Function;
    readonly prototype: Function;
}
export declare const Type: FunctionConstructor;
export interface Type<T = any> extends Function {
    new?(...args: any[]): T;
    readonly prototype: T;
}
export declare const AssignableType: FunctionConstructor;
export interface AssignableType<T = any> extends Function {
    new (...args: any[]): T;
}
export {};
