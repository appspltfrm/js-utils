"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildSourceFileIndex = buildSourceFileIndex;
const ts = require("typescript");
function buildSourceFileIndex(file, typeChecker, rootSymbol) {
    const valueUsedSymbols = new Set();
    const importsBySymbolName = new Map();
    //#region Imports index
    for (const statement of file.statements) {
        if (!ts.isImportDeclaration(statement)) {
            continue;
        }
        const clause = statement.importClause;
        if (!clause || clause.isTypeOnly) {
            continue;
        }
        if (!ts.isStringLiteral(statement.moduleSpecifier)) {
            continue;
        }
        const moduleSpecifier = statement.moduleSpecifier.text;
        if (clause.name) {
            importsBySymbolName.set(clause.name.text, { moduleSpecifier, isDefault: true });
        }
        if (clause.namedBindings && ts.isNamedImports(clause.namedBindings)) {
            for (const element of clause.namedBindings.elements) {
                const moduleName = element.propertyName ? element.propertyName.text : element.name.text;
                if (!importsBySymbolName.has(moduleName)) {
                    importsBySymbolName.set(moduleName, { moduleSpecifier, isDefault: false });
                }
                if (element.propertyName && !importsBySymbolName.has(element.name.text)) {
                    importsBySymbolName.set(element.name.text, { moduleSpecifier, isDefault: false });
                }
            }
        }
    }
    //#endregion
    //#region Value-used symbols (single DFS with ancestor flags)
    let inTypeDepth = 0;
    let inImportDepth = 0;
    let inExpressionDepth = 0;
    const visit = (node) => {
        let pushedType = false;
        let pushedImport = false;
        let pushedExpression = false;
        if (ts.isTypeNode(node)) {
            inTypeDepth++;
            pushedType = true;
        }
        if (ts.isImportDeclaration(node) ||
            ts.isImportClause(node) ||
            ts.isImportSpecifier(node)) {
            inImportDepth++;
            pushedImport = true;
        }
        if (ts.isExpression(node)) {
            inExpressionDepth++;
            pushedExpression = true;
        }
        if (ts.isIdentifier(node) &&
            inTypeDepth === 0 &&
            inImportDepth === 0 &&
            inExpressionDepth > 0) {
            const sym = typeChecker.getSymbolAtLocation(node);
            if (sym) {
                valueUsedSymbols.add(rootSymbol(sym));
            }
        }
        ts.forEachChild(node, visit);
        if (pushedType) {
            inTypeDepth--;
        }
        if (pushedImport) {
            inImportDepth--;
        }
        if (pushedExpression) {
            inExpressionDepth--;
        }
    };
    visit(file);
    //#endregion
    return { valueUsedSymbols, importsBySymbolName };
}
