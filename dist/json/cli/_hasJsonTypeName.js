import * as ts from "typescript";
const cache = new WeakMap();
/**
 * Walks the class's own declarations only — runtime check in
 * `decorators/serializable.ts:67` uses `hasOwnProperty("jsonTypeName")`,
 * so an inherited `static jsonTypeName` on a superclass does not count.
 */
export function hasOwnJsonTypeName(classSymbol) {
    const cached = cache.get(classSymbol);
    if (cached !== undefined) {
        return cached;
    }
    const decls = classSymbol.getDeclarations();
    if (!decls) {
        cache.set(classSymbol, false);
        return false;
    }
    for (const decl of decls) {
        if (!ts.isClassDeclaration(decl) && !ts.isClassExpression(decl)) {
            continue;
        }
        for (const member of decl.members) {
            if (!ts.isPropertyDeclaration(member)) {
                continue;
            }
            const isStatic = member.modifiers?.some(m => m.kind === ts.SyntaxKind.StaticKeyword);
            if (!isStatic) {
                continue;
            }
            const nameNode = member.name;
            const nameText = ts.isIdentifier(nameNode)
                ? nameNode.text
                : ts.isStringLiteral(nameNode)
                    ? nameNode.text
                    : undefined;
            if (nameText === "jsonTypeName") {
                cache.set(classSymbol, true);
                return true;
            }
        }
    }
    cache.set(classSymbol, false);
    return false;
}
//# sourceMappingURL=_hasJsonTypeName.js.map