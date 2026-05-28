/**
 * Static validator for `@serializable` class fields.
 *
 * Edge cases:
 * - Nullability (`X | null`, `X | undefined`) is unwrapped.
 * - Unions of >1 class branches yield UNION_TYPE_AMBIGUOUS (warning, not error)
 *   because the user may attach a custom Serializer at runtime.
 * - `Date`, `RegExp`, `URL`, `Buffer`, typed arrays → treated as basic.
 * - Type parameters (`T extends ...`) → basic.
 * - Inherited `jsonTypeName` on a superclass does NOT count — runtime uses
 *   `hasOwnProperty` (see `decorators/serializable.ts:67`).
 * - `static` / `declare` / `abstract` fields are skipped.
 */
import * as path from "node:path";
import * as ts from "typescript";
import {classifyFieldType, FieldClassification} from "./_classifyFieldType.js";
import {propertyDecoratorHasType} from "./_propertyDecoratorHasType.js";
import {getDeclaredSerializableTypes} from "./_serializableTypesList.js";
import {SerializableDiagCode, SerializableDiagnostic, SerializableDiagSeverity} from "./_SerializableDiagnostic.js";

export interface RunValidateSerializableOptions {
  tsconfigPath: string;
  /** Absolute path prefixes; if set, only files starting with one of them are checked. */
  filterPaths?: string[];
  /** Simple glob filters (`**` and `*`) against the absolute fileName. */
  include?: string[];
}

export function runValidateSerializable(opts: RunValidateSerializableOptions): SerializableDiagnostic[] {
  const program = loadProgram(opts.tsconfigPath);
  const checker = program.getTypeChecker();
  const diagnostics: SerializableDiagnostic[] = [];

  const includeRegexes = (opts.include ?? []).map(globToRegExp);
  const filterPaths = opts.filterPaths?.map(p => path.resolve(p));

  for (const sf of program.getSourceFiles()) {
    if (sf.isDeclarationFile) {
      continue;
    }
    if (sf.fileName.includes("/node_modules/")) {
      continue;
    }
    if (filterPaths && !filterPaths.some(p => sf.fileName.startsWith(p))) {
      continue;
    }
    if (includeRegexes.length > 0 && !includeRegexes.some(rx => rx.test(sf.fileName))) {
      continue;
    }
    if (!sf.text.includes("@serializable(")) {
      continue;
    }

    visitSourceFile(sf, checker, diagnostics);
  }

  return diagnostics;
}

function visitSourceFile(sf: ts.SourceFile, checker: ts.TypeChecker, out: SerializableDiagnostic[]): void {
  ts.forEachChild(sf, function visit(node) {
    if (ts.isClassDeclaration(node) && hasSerializableDecorator(node)) {
      processClass(node, sf, checker, out);
    }
    ts.forEachChild(node, visit);
  });
}

function processClass(
  cls: ts.ClassDeclaration,
  sf: ts.SourceFile,
  checker: ts.TypeChecker,
  out: SerializableDiagnostic[]
): void {
  const className = cls.name?.text ?? "<anonymous>";
  const declaredTypes = getDeclaredSerializableTypes(cls, checker);

  for (const member of cls.members) {
    if (!ts.isPropertyDeclaration(member)) {
      continue;
    }
    if (isSkippedField(member)) {
      continue;
    }

    const propName = ts.isIdentifier(member.name)
      ? member.name.text
      : ts.isStringLiteral(member.name)
        ? member.name.text
        : member.name.getText(sf);

    const propertyCall = findPropertyDecoratorCall(member);

    if (!propertyCall) {
      out.push(diag(sf, member, className, propName, "MISSING_PROPERTY_DECORATOR", "error",
        `Field "${propName}" is missing @property() — the serializer will not see it.`));
      continue;
    }

    if (propertyDecoratorHasType(propertyCall, checker)) {
      continue;
    }

    const classification = classifyFieldType(member.type, checker);
    emitClassificationDiagnostics(classification, declaredTypes, sf, member, className, propName, false, out);
  }
}

function emitClassificationDiagnostics(
  c: FieldClassification,
  declaredTypes: Set<ts.Symbol>,
  sf: ts.SourceFile,
  member: ts.PropertyDeclaration,
  className: string,
  propName: string,
  inCollection: boolean,
  out: SerializableDiagnostic[]
): void {
  switch (c.kind) {
    case "basic":
    case "missingTypeAnnotation":
      return;

    case "classWithoutJsonTypeName": {
      const code: SerializableDiagCode = inCollection ? "MISSING_TYPE_ARG_IN_COLLECTION" : "MISSING_TYPE_ARG";
      const where = inCollection ? `collection element class ${c.symbolName}` : `class ${c.symbolName}`;
      out.push(diag(sf, member, className, propName, code, "error",
        `Field "${propName}" has ${where} without jsonTypeName — @property(${c.symbolName}) is required.`));
      return;
    }

    case "classWithJsonTypeName": {
      if (declaredTypes.has(c.symbol)) {
        return;
      }
      const code: SerializableDiagCode = inCollection ? "TYPE_NOT_IN_TYPES_LIST_IN_COLLECTION" : "TYPE_NOT_IN_TYPES_LIST";
      out.push(diag(sf, member, className, propName, code, "error",
        `Field "${propName}" uses class ${c.symbolName} (with jsonTypeName) — add it to @serializable({types: [${c.symbolName}, ...]}).`));
      return;
    }

    case "collection":
      emitClassificationDiagnostics(c.inner, declaredTypes, sf, member, className, propName, true, out);
      return;

    case "union": {
      const classBranches = c.branches.filter(b => b.kind === "classWithJsonTypeName" || b.kind === "classWithoutJsonTypeName" || b.kind === "collection");
      if (classBranches.length === 0) {
        return;
      }
      if (classBranches.length === 1) {
        emitClassificationDiagnostics(classBranches[0], declaredTypes, sf, member, className, propName, inCollection, out);
        return;
      }
      const severity: SerializableDiagSeverity = "warning";
      out.push(diag(sf, member, className, propName, "UNION_TYPE_AMBIGUOUS", severity,
        `Field "${propName}" is a union of multiple class types — provide an explicit @property(SerializerOrClass) to disambiguate.`));
      return;
    }
  }
}

function isSkippedField(member: ts.PropertyDeclaration): boolean {
  const mods = member.modifiers;
  if (!mods) {
    return false;
  }
  for (const m of mods) {
    if (
      m.kind === ts.SyntaxKind.StaticKeyword
      || m.kind === ts.SyntaxKind.DeclareKeyword
      || m.kind === ts.SyntaxKind.AbstractKeyword
    ) {
      return true;
    }
  }
  return false;
}

function findPropertyDecoratorCall(member: ts.PropertyDeclaration): ts.CallExpression | undefined {
  const decorators = ts.canHaveDecorators(member) ? ts.getDecorators(member) : undefined;
  if (!decorators) {
    return undefined;
  }
  for (const d of decorators) {
    if (ts.isCallExpression(d.expression)) {
      const callee = d.expression.expression;
      if (ts.isIdentifier(callee) && callee.text === "property") {
        return d.expression;
      }
    } else if (ts.isIdentifier(d.expression) && d.expression.text === "property") {
      // `@property` without `()` — runtime call shape is wrong, but treat as "present, no type"
      return ts.factory.createCallExpression(d.expression, undefined, []);
    }
  }
  return undefined;
}

function hasSerializableDecorator(cls: ts.ClassDeclaration): boolean {
  const decorators = ts.canHaveDecorators(cls) ? ts.getDecorators(cls) : undefined;
  if (!decorators) {
    return false;
  }
  for (const d of decorators) {
    if (!ts.isCallExpression(d.expression)) {
      continue;
    }
    const callee = d.expression.expression;
    if (ts.isIdentifier(callee) && callee.text === "serializable") {
      return true;
    }
  }
  return false;
}

function diag(
  sf: ts.SourceFile,
  node: ts.Node,
  className: string,
  propName: string,
  code: SerializableDiagCode,
  severity: SerializableDiagSeverity,
  message: string
): SerializableDiagnostic {
  const pos = node.getStart(sf);
  const {line, character} = ts.getLineAndCharacterOfPosition(sf, pos);
  return {
    file: sf.fileName,
    line: line + 1,
    column: character + 1,
    className,
    propName,
    code,
    severity,
    message
  };
}

function loadProgram(tsconfigPath: string): ts.Program {
  const absConfigPath = path.resolve(tsconfigPath);
  const configFile = ts.readConfigFile(absConfigPath, ts.sys.readFile);
  if (configFile.error) {
    throw new Error(`tsconfig read error: ${ts.flattenDiagnosticMessageText(configFile.error.messageText, "\n")}`);
  }
  const raw = {...configFile.config};
  // Strip ts-patch plugins so we don't pull TsTransformer at validation time.
  if (raw.compilerOptions) {
    raw.compilerOptions = {...raw.compilerOptions};
    delete raw.compilerOptions.plugins;
  }
  const parsed = ts.parseJsonConfigFileContent(raw, ts.sys, path.dirname(absConfigPath));
  return ts.createProgram({rootNames: parsed.fileNames, options: parsed.options});
}

function globToRegExp(glob: string): RegExp {
  // Minimal `**` and `*` support against absolute paths.
  let pattern = "";
  for (let i = 0; i < glob.length; i++) {
    const ch = glob[i];
    if (ch === "*") {
      if (glob[i + 1] === "*") {
        pattern += ".*";
        i++;
      } else {
        pattern += "[^/]*";
      }
    } else if (/[.+?^${}()|[\]\\]/.test(ch)) {
      pattern += "\\" + ch;
    } else {
      pattern += ch;
    }
  }
  return new RegExp(pattern + "$");
}
