import * as ts from "typescript";

/**
 * Mirrors the runtime overload resolution in `decorators/property.ts:54-60`:
 * the first argument counts as the `type` only when it's a class/function
 * reference or an instance of `Serializer` — a string is `jsonName`, an object
 * literal is `options`.
 */
export function propertyDecoratorHasType(call: ts.CallExpression, checker: ts.TypeChecker): boolean {
  if (call.arguments.length === 0) {
    return false;
  }

  const arg0 = call.arguments[0];

  if (
    ts.isStringLiteral(arg0)
    || ts.isNoSubstitutionTemplateLiteral(arg0)
    || ts.isTemplateExpression(arg0)
    || ts.isObjectLiteralExpression(arg0)
  ) {
    return false;
  }

  if (ts.isNewExpression(arg0)) {
    return true;
  }

  if (ts.isIdentifier(arg0) || ts.isPropertyAccessExpression(arg0)) {
    const sym = checker.getSymbolAtLocation(arg0);
    if (!sym) {
      return false;
    }
    const root = sym.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(sym) : sym;
    if (root.flags & (ts.SymbolFlags.Class | ts.SymbolFlags.Function)) {
      return true;
    }
    const t = checker.getTypeOfSymbolAtLocation(root, arg0);
    return typeExtendsSerializer(t, checker);
  }

  return false;
}

function typeExtendsSerializer(type: ts.Type, checker: ts.TypeChecker): boolean {
  const seen = new Set<ts.Type>();
  const stack: ts.Type[] = [type];
  while (stack.length > 0) {
    const t = stack.pop()!;
    if (seen.has(t)) {
      continue;
    }
    seen.add(t);

    const sym = t.getSymbol();
    if (sym && sym.getName() === "Serializer") {
      return true;
    }

    const bases = t.getBaseTypes();
    if (bases) {
      for (const b of bases) {
        stack.push(b);
      }
    }
  }
  return false;
}
