import * as ts from "typescript";
/**
 * Extract class symbols listed under `types: [...]` in `@serializable({types: [...]})`.
 *
 * Per `serializable.ts:83`, `types` may be a nested array: `Array<X | X[] | ...>`.
 * We flatten array literals; any non-identifier (TypeProvider call expressions, etc.)
 * is ignored — the validator can't statically know what such providers return.
 */
export function getDeclaredSerializableTypes(classDecl, checker) {
    const out = new Set();
    const serializableCall = findSerializableCall(classDecl);
    if (!serializableCall) {
        return out;
    }
    const optionsArg = serializableCall.arguments[0];
    if (!optionsArg || !ts.isObjectLiteralExpression(optionsArg)) {
        return out;
    }
    const typesProp = optionsArg.properties.find(p => {
        if (!ts.isPropertyAssignment(p)) {
            return false;
        }
        const name = p.name;
        return (ts.isIdentifier(name) || ts.isStringLiteral(name)) && name.text === "types";
    });
    if (!typesProp) {
        return out;
    }
    const initializer = typesProp.initializer;
    if (!ts.isArrayLiteralExpression(initializer)) {
        return out;
    }
    collectFromArray(initializer, checker, out);
    return out;
}
function collectFromArray(arr, checker, out) {
    for (const el of arr.elements) {
        if (ts.isArrayLiteralExpression(el)) {
            collectFromArray(el, checker, out);
            continue;
        }
        if (ts.isIdentifier(el) || ts.isPropertyAccessExpression(el)) {
            const sym = checker.getSymbolAtLocation(el);
            if (!sym) {
                continue;
            }
            const root = sym.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(sym) : sym;
            if (root.flags & ts.SymbolFlags.Class) {
                out.add(root);
            }
        }
    }
}
function findSerializableCall(classDecl) {
    const decorators = ts.canHaveDecorators(classDecl) ? ts.getDecorators(classDecl) : undefined;
    if (!decorators) {
        return undefined;
    }
    for (const d of decorators) {
        if (!ts.isCallExpression(d.expression)) {
            continue;
        }
        const callee = d.expression.expression;
        if (ts.isIdentifier(callee) && callee.text === "serializable") {
            return d.expression;
        }
    }
    return undefined;
}
//# sourceMappingURL=_serializableTypesList.js.map