import * as ts from "typescript";
/**
 * Walks the class's own declarations only — runtime check in
 * `decorators/serializable.ts:67` uses `hasOwnProperty("jsonTypeName")`,
 * so an inherited `static jsonTypeName` on a superclass does not count.
 */
export declare function hasOwnJsonTypeName(classSymbol: ts.Symbol): boolean;
