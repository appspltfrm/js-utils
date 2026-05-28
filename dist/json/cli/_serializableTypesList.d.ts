import * as ts from "typescript";
/**
 * Extract class symbols listed under `types: [...]` in `@serializable({types: [...]})`.
 *
 * Per `serializable.ts:83`, `types` may be a nested array: `Array<X | X[] | ...>`.
 * We flatten array literals; any non-identifier (TypeProvider call expressions, etc.)
 * is ignored — the validator can't statically know what such providers return.
 */
export declare function getDeclaredSerializableTypes(classDecl: ts.ClassDeclaration, checker: ts.TypeChecker): Set<ts.Symbol>;
