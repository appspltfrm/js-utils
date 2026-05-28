import * as ts from "typescript";
export interface ImportEntry {
    moduleSpecifier: string;
    isDefault: boolean;
}
export interface SourceFileIndex {
    valueUsedSymbols: Set<ts.Symbol>;
    importsBySymbolName: Map<string, ImportEntry>;
}
export declare function buildSourceFileIndex(file: ts.SourceFile, typeChecker: ts.TypeChecker, rootSymbol: (sym: ts.Symbol) => ts.Symbol): SourceFileIndex;
