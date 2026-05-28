import * as ts from "typescript";
/**
 * Mirrors the runtime overload resolution in `decorators/property.ts:54-60`:
 * the first argument counts as the `type` only when it's a class/function
 * reference or an instance of `Serializer` — a string is `jsonName`, an object
 * literal is `options`.
 */
export declare function propertyDecoratorHasType(call: ts.CallExpression, checker: ts.TypeChecker): boolean;
