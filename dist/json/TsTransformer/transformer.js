"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSerializableTransformer = createSerializableTransformer;
const path = require("path");
const ts = require("typescript");
const _sourceFileIndex_js_1 = require("./_sourceFileIndex.js");
function createProgramMemo(program) {
    const opts = program.getCompilerOptions();
    // Use numeric values to avoid TS narrowing of deprecated NodeJs alias (=2 → Node10)
    // 2 = NodeJs/Node10, 3 = Node16, 99 = NodeNext
    const mr = opts.moduleResolution;
    const isNodeResolution = mr === 2 || mr === 3 || mr === 99;
    return {
        rootSymbol: new WeakMap(),
        isRuntimeValue: new WeakMap(),
        moduleSpecifier: new Map(),
        basicTypeNames: new Set(["string", "number", "boolean", "any", "void", "Array", "Set", "Map", "Date"]),
        basicCollectionArgNames: new Set(["string", "number", "boolean", "any", "void"]),
        isNodeResolution,
        fileIndex: new WeakMap()
    };
}
function getRootSymbol(memo, typeChecker, sym) {
    const cached = memo.rootSymbol.get(sym);
    if (cached) {
        return cached;
    }
    let target = sym;
    if (target.flags & ts.SymbolFlags.Alias) {
        try {
            target = typeChecker.getAliasedSymbol(target);
        }
        catch {
            // fallthrough
        }
    }
    memo.rootSymbol.set(sym, target);
    return target;
}
function isSymbolRuntimeValue(memo, typeChecker, sym) {
    const cached = memo.isRuntimeValue.get(sym);
    if (cached !== undefined) {
        return cached;
    }
    const target = getRootSymbol(memo, typeChecker, sym);
    const hasValueFlag = (target.flags & ts.SymbolFlags.Value) !== 0;
    const isInterface = (target.flags & ts.SymbolFlags.Interface) !== 0;
    const isTypeAlias = (target.flags & ts.SymbolFlags.TypeAlias) !== 0;
    const result = (isInterface || isTypeAlias) && !hasValueFlag ? false : hasValueFlag;
    memo.isRuntimeValue.set(sym, result);
    return result;
}
function getOrBuildFileIndex(memo, typeChecker, file) {
    let index = memo.fileIndex.get(file);
    if (!index) {
        index = (0, _sourceFileIndex_js_1.buildSourceFileIndex)(file, typeChecker, sym => getRootSymbol(memo, typeChecker, sym));
        memo.fileIndex.set(file, index);
    }
    return index;
}
function computeModuleSpecifier(currentFile, targetFile, isNodeResolution, aliasReverse) {
    //#region Reverse-alias (longest replacement wins)
    if (aliasReverse.length > 0) {
        let best;
        for (const a of aliasReverse) {
            if (targetFile.startsWith(a.replacement)) {
                if (!best || a.replacement.length > best.replacement.length) {
                    best = a;
                }
            }
        }
        if (best) {
            let suffix = targetFile.slice(best.replacement.length);
            suffix = suffix.replace(/\.tsx?$/, "");
            return `${best.find}${suffix}`;
        }
    }
    //#endregion
    if (isNodeResolution) {
        if (!targetFile.includes("node_modules")) {
            let moduleSpecifier = path.relative(path.dirname(currentFile), targetFile);
            if (!moduleSpecifier.startsWith(".")) {
                moduleSpecifier = "./" + moduleSpecifier;
            }
            return moduleSpecifier.replace(/\.ts(x?)$/, "");
        }
        const parts = targetFile.split("node_modules/");
        return parts[parts.length - 1].replace(/\.d\.ts$/, "").replace(/\.ts$/, "");
    }
    return targetFile.replace(/\.ts(x?)$/, "");
}
function createSerializableTransformer(program, options) {
    const memo = createProgramMemo(program);
    const aliasReverse = options?.aliasReverse ?? [];
    return (context) => (file) => {
        //#region Early-exit
        if (!file.text.includes("@serializable(")) {
            return file;
        }
        //#endregion
        const typeChecker = program.getTypeChecker();
        const index = getOrBuildFileIndex(memo, typeChecker, file);
        const typesToImport = new Map();
        const sourceFile = visitNodeAndChildren(file, context, typesToImport, memo, typeChecker, index, aliasReverse);
        if (typesToImport.size === 0) {
            return sourceFile;
        }
        //#region Synthesize _T_ import statements
        const importStatements = [];
        for (const [moduleSpecifier, names] of typesToImport) {
            const importSpecifiers = [];
            let defaultImportName;
            for (const name of names) {
                const existing = index.importsBySymbolName.get(name);
                const isDefault = !!existing && existing.isDefault && existing.moduleSpecifier === moduleSpecifier;
                if (isDefault) {
                    defaultImportName = `_T_${name}`;
                }
                else {
                    importSpecifiers.push(ts.factory.createImportSpecifier(false, ts.factory.createIdentifier(name), ts.factory.createIdentifier(`_T_${name}`)));
                }
            }
            importStatements.push(ts.factory.createImportDeclaration(undefined, ts.factory.createImportClause(false, defaultImportName ? ts.factory.createIdentifier(defaultImportName) : undefined, importSpecifiers.length > 0 ? ts.factory.createNamedImports(importSpecifiers) : undefined), ts.factory.createStringLiteral(moduleSpecifier)));
        }
        //#endregion
        return ts.factory.updateSourceFile(sourceFile, [...importStatements, ...sourceFile.statements]);
    };
}
function visitNodeAndChildren(node, context, typesToImport, memo, typeChecker, index, aliasReverse) {
    return ts.visitEachChild(visitNode(node, typesToImport, memo, typeChecker, index, aliasReverse), childNode => visitNodeAndChildren(childNode, context, typesToImport, memo, typeChecker, index, aliasReverse), context);
}
function visitNode(node, typesToImport, memo, typeChecker, index, aliasReverse) {
    if (!ts.isDecorator(node)) {
        return node;
    }
    if (!ts.isClassDeclaration(node.parent)) {
        return node;
    }
    if (!ts.isCallExpression(node.expression)) {
        return node;
    }
    const call = node.expression;
    const isSerializable = ts.isIdentifier(call.expression) && call.expression.text === "serializable";
    if (!isSerializable) {
        return node;
    }
    const clazz = node.parent;
    const clazzProps = [];
    const addTypeToImport = (symbol) => {
        if (!isSymbolRuntimeValue(memo, typeChecker, symbol)) {
            return undefined;
        }
        const declarations = symbol.getDeclarations();
        if (!declarations || declarations.length === 0) {
            return undefined;
        }
        const symbolSourceFile = declarations[0].getSourceFile();
        const currentSourceFile = node.getSourceFile();
        if (symbolSourceFile === currentSourceFile) {
            return undefined;
        }
        const rooted = getRootSymbol(memo, typeChecker, symbol);
        if (index.valueUsedSymbols.has(rooted)) {
            return ts.factory.createIdentifier(symbol.getName());
        }
        //#region Resolve module specifier
        let moduleSpecifier;
        const existing = index.importsBySymbolName.get(symbol.name);
        if (existing) {
            moduleSpecifier = existing.moduleSpecifier;
        }
        if (!moduleSpecifier) {
            const currentFile = currentSourceFile.fileName;
            const targetFile = symbolSourceFile.fileName;
            const cacheKey = `${currentFile}\0${targetFile}`;
            const cached = memo.moduleSpecifier.get(cacheKey);
            if (cached !== undefined) {
                moduleSpecifier = cached;
            }
            else {
                moduleSpecifier = computeModuleSpecifier(currentFile, targetFile, memo.isNodeResolution, aliasReverse);
                memo.moduleSpecifier.set(cacheKey, moduleSpecifier);
            }
        }
        //#endregion
        let names = typesToImport.get(moduleSpecifier);
        if (!names) {
            names = new Set();
            typesToImport.set(moduleSpecifier, names);
        }
        names.add(symbol.getName());
        return ts.factory.createIdentifier(`_T_${symbol.getName()}`);
    };
    const getPropertyConfig = (typeNode) => {
        const props = [];
        if (typeNode) {
            if (ts.isArrayTypeNode(typeNode)) {
                const config = getPropertyConfig(typeNode.elementType);
                const typeIdent = config.properties.find(p => ts.isPropertyAssignment(p) && p.name.text === "propertyType");
                if (typeIdent) {
                    props.push(ts.factory.createPropertyAssignment(ts.factory.createIdentifier("propertyType"), typeIdent.initializer));
                }
            }
            else {
                const type = typeChecker.getTypeFromTypeNode(typeNode);
                const symbol = type.getSymbol() || type.aliasSymbol;
                if (symbol) {
                    const typeName = typeChecker.getFullyQualifiedName(symbol);
                    const isBasicType = memo.basicTypeNames.has(typeName);
                    if (!isBasicType) {
                        if (isSymbolRuntimeValue(memo, typeChecker, symbol)) {
                            const typeIdent = addTypeToImport(symbol);
                            if (typeIdent) {
                                props.push(ts.factory.createPropertyAssignment(ts.factory.createIdentifier("propertyType"), typeIdent));
                            }
                        }
                    }
                    else if (typeName === "Array" || typeName === "Set" || typeName === "Map") {
                        if (ts.isTypeReferenceNode(typeNode) &&
                            typeNode.typeArguments &&
                            typeNode.typeArguments.length > 0) {
                            const argIndex = typeName === "Map" && typeNode.typeArguments.length > 1 ? 1 : 0;
                            const typeArg = typeNode.typeArguments[argIndex];
                            const argType = typeChecker.getTypeFromTypeNode(typeArg);
                            const argSymbol = argType.getSymbol() || argType.aliasSymbol;
                            if (argSymbol) {
                                const argTypeName = typeChecker.getFullyQualifiedName(argSymbol);
                                if (!memo.basicCollectionArgNames.has(argTypeName)) {
                                    if (isSymbolRuntimeValue(memo, typeChecker, argSymbol)) {
                                        const typeIdent = addTypeToImport(argSymbol);
                                        if (typeIdent) {
                                            props.push(ts.factory.createPropertyAssignment(ts.factory.createIdentifier("propertyType"), typeIdent));
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return ts.factory.createObjectLiteralExpression(props);
    };
    for (const childNode of clazz.members) {
        if (!ts.isPropertyDeclaration(childNode)) {
            continue;
        }
        if (childNode.modifiers?.find(m => m.kind === ts.SyntaxKind.StaticKeyword)) {
            continue;
        }
        const nameNode = childNode.name;
        const propName = ts.isIdentifier(nameNode) ? nameNode.text : nameNode.getText();
        clazzProps.push(ts.factory.createPropertyAssignment(ts.factory.createIdentifier(propName), getPropertyConfig(childNode.type)));
    }
    const optionsProps = [
        ts.factory.createPropertyAssignment(ts.factory.createIdentifier("properties"), ts.factory.createObjectLiteralExpression(clazzProps))
    ];
    return ts.factory.updateDecorator(node, ts.factory.updateCallExpression(call, call.expression, undefined, call.arguments.concat(ts.factory.createObjectLiteralExpression(optionsProps))));
}
