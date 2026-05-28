import * as ts from "typescript";
export type FieldClassification = {
    kind: "missingTypeAnnotation";
} | {
    kind: "basic";
} | {
    kind: "classWithJsonTypeName";
    symbol: ts.Symbol;
    symbolName: string;
} | {
    kind: "classWithoutJsonTypeName";
    symbol: ts.Symbol;
    symbolName: string;
} | {
    kind: "collection";
    container: "Array" | "Set" | "Map";
    inner: FieldClassification;
} | {
    kind: "union";
    branches: FieldClassification[];
};
export declare function classifyFieldType(typeNode: ts.TypeNode | undefined, checker: ts.TypeChecker): FieldClassification;
