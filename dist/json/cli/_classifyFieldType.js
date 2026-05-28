import * as ts from "typescript";
import { hasOwnJsonTypeName } from "./_hasJsonTypeName.js";
const BASIC_TYPE_NAMES = new Set([
    "string",
    "number",
    "boolean",
    "bigint",
    "any",
    "unknown",
    "void",
    "null",
    "undefined",
    "never",
    "object",
    "Date",
    "RegExp",
    "URL",
    "Buffer",
    "ArrayBuffer",
    "Uint8Array",
    "Uint16Array",
    "Uint32Array",
    "Int8Array",
    "Int16Array",
    "Int32Array",
    "Float32Array",
    "Float64Array"
]);
export function classifyFieldType(typeNode, checker) {
    if (!typeNode) {
        return { kind: "missingTypeAnnotation" };
    }
    return classifyTypeNode(typeNode, checker);
}
function classifyTypeNode(typeNode, checker) {
    //#region Unwrap parenthesized
    if (ts.isParenthesizedTypeNode(typeNode)) {
        return classifyTypeNode(typeNode.type, checker);
    }
    //#endregion
    //#region Unwrap nullability and unions
    if (ts.isUnionTypeNode(typeNode)) {
        const significant = [];
        for (const t of typeNode.types) {
            if (isNullishTypeNode(t)) {
                continue;
            }
            significant.push(t);
        }
        if (significant.length === 0) {
            return { kind: "basic" };
        }
        if (significant.length === 1) {
            return classifyTypeNode(significant[0], checker);
        }
        const branches = significant.map(t => classifyTypeNode(t, checker));
        return { kind: "union", branches };
    }
    //#endregion
    //#region Array literal: X[]
    if (ts.isArrayTypeNode(typeNode)) {
        return {
            kind: "collection",
            container: "Array",
            inner: classifyTypeNode(typeNode.elementType, checker)
        };
    }
    //#endregion
    //#region Type reference: Array<X>, Set<X>, Map<K, V>, plus user types
    if (ts.isTypeReferenceNode(typeNode)) {
        const refName = getTypeRefName(typeNode);
        if (refName === "Array" || refName === "Set" || refName === "ReadonlyArray" || refName === "ReadonlySet") {
            const inner = typeNode.typeArguments?.[0];
            if (!inner) {
                return { kind: "basic" };
            }
            return {
                kind: "collection",
                container: "Array",
                inner: classifyTypeNode(inner, checker)
            };
        }
        if (refName === "Map" || refName === "ReadonlyMap") {
            const inner = typeNode.typeArguments?.[1];
            if (!inner) {
                return { kind: "basic" };
            }
            return {
                kind: "collection",
                container: "Map",
                inner: classifyTypeNode(inner, checker)
            };
        }
    }
    //#endregion
    //#region Tuple / type literal / mapped / function / index access
    if (ts.isTupleTypeNode(typeNode)
        || ts.isTypeLiteralNode(typeNode)
        || ts.isMappedTypeNode(typeNode)
        || ts.isFunctionTypeNode(typeNode)
        || ts.isIndexedAccessTypeNode(typeNode)
        || ts.isTypeOperatorNode(typeNode)
        || ts.isConditionalTypeNode(typeNode)
        || ts.isTemplateLiteralTypeNode(typeNode)
        || ts.isLiteralTypeNode(typeNode)
        || ts.isThisTypeNode(typeNode)
        || ts.isIntersectionTypeNode(typeNode)) {
        return { kind: "basic" };
    }
    //#endregion
    //#region Basic keywords
    if (isBasicKeywordTypeNode(typeNode)) {
        return { kind: "basic" };
    }
    //#endregion
    //#region Resolve symbol via checker
    const type = checker.getTypeFromTypeNode(typeNode);
    const rawSymbol = type.getSymbol() ?? type.aliasSymbol;
    if (!rawSymbol) {
        return { kind: "basic" };
    }
    const symbol = rawSymbol.flags & ts.SymbolFlags.Alias
        ? checker.getAliasedSymbol(rawSymbol)
        : rawSymbol;
    if (symbol.flags & ts.SymbolFlags.TypeParameter) {
        return { kind: "basic" };
    }
    if (symbol.flags & ts.SymbolFlags.Enum || symbol.flags & ts.SymbolFlags.EnumMember || symbol.flags & ts.SymbolFlags.RegularEnum || symbol.flags & ts.SymbolFlags.ConstEnum) {
        return { kind: "basic" };
    }
    const name = symbol.getName();
    if (BASIC_TYPE_NAMES.has(name)) {
        return { kind: "basic" };
    }
    if (symbol.flags & ts.SymbolFlags.Class) {
        return hasOwnJsonTypeName(symbol)
            ? { kind: "classWithJsonTypeName", symbol, symbolName: name }
            : { kind: "classWithoutJsonTypeName", symbol, symbolName: name };
    }
    return { kind: "basic" };
    //#endregion
}
function isNullishTypeNode(node) {
    if (node.kind === ts.SyntaxKind.UndefinedKeyword || node.kind === ts.SyntaxKind.NullKeyword) {
        return true;
    }
    if (ts.isLiteralTypeNode(node)) {
        const lit = node.literal;
        if (lit.kind === ts.SyntaxKind.NullKeyword) {
            return true;
        }
        if (lit.kind === ts.SyntaxKind.UndefinedKeyword) {
            return true;
        }
    }
    return false;
}
function isBasicKeywordTypeNode(node) {
    switch (node.kind) {
        case ts.SyntaxKind.StringKeyword:
        case ts.SyntaxKind.NumberKeyword:
        case ts.SyntaxKind.BooleanKeyword:
        case ts.SyntaxKind.BigIntKeyword:
        case ts.SyntaxKind.AnyKeyword:
        case ts.SyntaxKind.UnknownKeyword:
        case ts.SyntaxKind.VoidKeyword:
        case ts.SyntaxKind.UndefinedKeyword:
        case ts.SyntaxKind.NullKeyword:
        case ts.SyntaxKind.NeverKeyword:
        case ts.SyntaxKind.ObjectKeyword:
        case ts.SyntaxKind.SymbolKeyword:
            return true;
        default:
            return false;
    }
}
function getTypeRefName(node) {
    const tn = node.typeName;
    if (ts.isIdentifier(tn)) {
        return tn.text;
    }
    // QualifiedName: Module.Name → use last segment
    let cur = tn;
    while (ts.isQualifiedName(cur)) {
        cur = cur.right;
    }
    if (ts.isIdentifier(cur)) {
        return cur.text;
    }
    return undefined;
}
//# sourceMappingURL=_classifyFieldType.js.map