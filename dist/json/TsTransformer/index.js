"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = transformer;
const ts = require("typescript");
const path = require("path");
function transformer(program) {
    return (context) => (file) => {
        const typesToImport = new Map();
        const sourceFile = visitNodeAndChildren(file, program, context, typesToImport);
        if (typesToImport.size === 0) {
            return sourceFile;
        }
        const importStatements = [];
        for (const [moduleSpecifier, names] of typesToImport) {
            const importSpecifiers = [];
            let defaultImportName;
            for (const name of names) {
                // Check if it was a default import in the original file
                let isDefault = false;
                for (const statement of file.statements) {
                    if (ts.isImportDeclaration(statement) &&
                        ts.isStringLiteral(statement.moduleSpecifier) &&
                        statement.moduleSpecifier.text === moduleSpecifier &&
                        statement.importClause &&
                        statement.importClause.name &&
                        statement.importClause.name.text === name) {
                        isDefault = true;
                        break;
                    }
                }
                if (isDefault) {
                    defaultImportName = `_T_${name}`;
                }
                else {
                    importSpecifiers.push(ts.factory.createImportSpecifier(false, ts.factory.createIdentifier(name), ts.factory.createIdentifier(`_T_${name}`)));
                }
            }
            importStatements.push(ts.factory.createImportDeclaration(undefined, ts.factory.createImportClause(false, defaultImportName ? ts.factory.createIdentifier(defaultImportName) : undefined, importSpecifiers.length > 0 ? ts.factory.createNamedImports(importSpecifiers) : undefined), ts.factory.createStringLiteral(moduleSpecifier)));
        }
        return ts.factory.updateSourceFile(sourceFile, [
            ...importStatements,
            ...sourceFile.statements
        ]);
    };
}
function visitNodeAndChildren(node, program, context, typesToImport) {
    return ts.visitEachChild(visitNode(node, program, typesToImport), childNode => visitNodeAndChildren(childNode, program, context, typesToImport), context);
}
function visitNode(node, program, typesToImport) {
    const typeChecker = program.getTypeChecker();
    const symbolIsRuntimeValue = (sym) => {
        // Resolve aliases first
        let target = sym;
        if (target.flags & ts.SymbolFlags.Alias) {
            try {
                target = typeChecker.getAliasedSymbol(target);
            }
            catch (_) {
                // fallthrough
            }
        }
        const hasValueFlag = (target.flags & ts.SymbolFlags.Value) !== 0;
        const isInterface = (target.flags & ts.SymbolFlags.Interface) !== 0;
        const isTypeAlias = (target.flags & ts.SymbolFlags.TypeAlias) !== 0;
        // If it's an interface or type alias and not also a value, it's not available at runtime
        if ((isInterface || isTypeAlias) && !hasValueFlag)
            return false;
        return hasValueFlag;
    };
    if (ts.isDecorator(node) && ts.isClassDeclaration(node.parent) && ts.isCallExpression(node.expression)) {
        const call = node.expression;
        const isSerializable = ts.isIdentifier(call.expression) && call.expression.getText() === "serializable";
        if (isSerializable) {
            const clazzProps = [];
            const clazz = node.parent;
            const isUsedAsValue = (symbol) => {
                const declarations = symbol.getDeclarations();
                if (!declarations)
                    return false;
                const currentSourceFile = node.getSourceFile();
                // Check all identifiers in the current source file that refer to this symbol
                const checkNode = (n) => {
                    if (ts.isIdentifier(n) && n.parent) {
                        // Skip the identifier in the property type itself
                        let parent = n.parent;
                        while (parent && parent !== node.parent) {
                            if (ts.isTypeNode(parent))
                                return false;
                            parent = parent.parent;
                        }
                        // Skip identifiers in imports
                        let p = n.parent;
                        while (p && p !== currentSourceFile) {
                            if (ts.isImportClause(p) || ts.isImportSpecifier(p) || ts.isImportDeclaration(p))
                                return false;
                            p = p.parent;
                        }
                        const nSymbol = typeChecker.getSymbolAtLocation(n);
                        if (nSymbol) {
                            const getRootSymbol = (s) => {
                                if (s.flags & ts.SymbolFlags.Alias) {
                                    return typeChecker.getAliasedSymbol(s);
                                }
                                return s;
                            };
                            const nRoot = getRootSymbol(nSymbol);
                            const targetRoot = getRootSymbol(symbol);
                            if (nRoot === targetRoot) {
                                // Check if it's used in an expression context (not just as a type)
                                let curr = n;
                                let isValueUsage = false;
                                while (curr && curr !== currentSourceFile) {
                                    // If we are inside a type node, this identifier is used as a type
                                    if (ts.isTypeNode(curr)) {
                                        isValueUsage = false;
                                        break;
                                    }
                                    if (ts.isExpression(curr)) {
                                        isValueUsage = true;
                                    }
                                    curr = curr.parent;
                                }
                                if (isValueUsage)
                                    return true;
                            }
                        }
                    }
                    return ts.forEachChild(n, checkNode) || false;
                };
                return checkNode(currentSourceFile);
            };
            const addTypeToImport = (symbol) => {
                // Ensure the symbol corresponds to a runtime value (not a pure type/interface), resolve aliases
                if (!symbolIsRuntimeValue(symbol))
                    return undefined;
                const declarations = symbol.getDeclarations();
                if (declarations && declarations.length > 0) {
                    const symbolSourceFile = declarations[0].getSourceFile();
                    const currentSourceFile = node.getSourceFile();
                    if (symbolSourceFile !== currentSourceFile) {
                        if (isUsedAsValue(symbol)) {
                            return ts.factory.createIdentifier(symbol.getName());
                        }
                        let moduleSpecifier;
                        // Check if the symbol is already imported in the current file
                        for (const statement of currentSourceFile.statements) {
                            if (ts.isImportDeclaration(statement) && statement.importClause) {
                                // Skip type-only imports as they do not provide runtime values
                                if (statement.importClause.isTypeOnly) {
                                    continue;
                                }
                                if (statement.importClause.namedBindings && ts.isNamedImports(statement.importClause.namedBindings)) {
                                    for (const element of statement.importClause.namedBindings.elements) {
                                        if (element.name.text === symbol.name || (element.propertyName && element.propertyName.text === symbol.name)) {
                                            if (ts.isStringLiteral(statement.moduleSpecifier)) {
                                                moduleSpecifier = statement.moduleSpecifier.text;
                                                break;
                                            }
                                        }
                                    }
                                }
                                else if (statement.importClause.name) {
                                    // Default import (non type-only)
                                    if (statement.importClause.name.text === symbol.name) {
                                        if (ts.isStringLiteral(statement.moduleSpecifier)) {
                                            moduleSpecifier = statement.moduleSpecifier.text;
                                        }
                                    }
                                }
                            }
                            if (moduleSpecifier)
                                break;
                        }
                        if (!moduleSpecifier) {
                            const currentFile = currentSourceFile.fileName;
                            const targetFile = symbolSourceFile.fileName;
                            if (program.getCompilerOptions().moduleResolution === ts.ModuleResolutionKind.NodeJs ||
                                program.getCompilerOptions().moduleResolution === ts.ModuleResolutionKind.Node10 ||
                                program.getCompilerOptions().moduleResolution === ts.ModuleResolutionKind.Node16 ||
                                program.getCompilerOptions().moduleResolution === ts.ModuleResolutionKind.NodeNext) {
                                if (!targetFile.includes("node_modules")) {
                                    moduleSpecifier = path.relative(path.dirname(currentFile), targetFile);
                                    if (!moduleSpecifier.startsWith(".")) {
                                        moduleSpecifier = "./" + moduleSpecifier;
                                    }
                                    moduleSpecifier = moduleSpecifier.replace(/\.ts(x?)$/, "");
                                }
                                else {
                                    // For node_modules, we need to find the package name
                                    const parts = targetFile.split("node_modules/");
                                    moduleSpecifier = parts[parts.length - 1].replace(/\.d\.ts$/, "").replace(/\.ts$/, "");
                                }
                            }
                            else {
                                moduleSpecifier = targetFile.replace(/\.ts(x?)$/, "");
                            }
                        }
                        let names = typesToImport.get(moduleSpecifier);
                        if (!names) {
                            names = new Set();
                            typesToImport.set(moduleSpecifier, names);
                        }
                        names.add(symbol.getName());
                        return ts.factory.createIdentifier(`_T_${symbol.getName()}`);
                    }
                }
                return undefined;
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
                            const isBasicType = ["string", "number", "boolean", "any", "void", "Array", "Set", "Map", "Date"].includes(typeName);
                            if (!isBasicType) {
                                // Ensure symbol represents a runtime value (not interface/type-only)
                                if (symbolIsRuntimeValue(symbol)) {
                                    const typeIdent = addTypeToImport(symbol);
                                    if (typeIdent) {
                                        props.push(ts.factory.createPropertyAssignment(ts.factory.createIdentifier("propertyType"), typeIdent));
                                    }
                                }
                            }
                            else if (typeName === "Array" || typeName === "Set" || typeName === "Map") {
                                if (ts.isTypeReferenceNode(typeNode) && typeNode.typeArguments && typeNode.typeArguments.length > 0) {
                                    // For now, we take the first type argument for Array and Set, and the second for Map
                                    const argIndex = typeName === "Map" && typeNode.typeArguments.length > 1 ? 1 : 0;
                                    const typeArg = typeNode.typeArguments[argIndex];
                                    const argType = typeChecker.getTypeFromTypeNode(typeArg);
                                    const argSymbol = argType.getSymbol() || argType.aliasSymbol;
                                    if (argSymbol) {
                                        const argTypeName = typeChecker.getFullyQualifiedName(argSymbol);
                                        if (!["string", "number", "boolean", "any", "void"].includes(argTypeName)) {
                                            if (symbolIsRuntimeValue(argSymbol)) {
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
                if (ts.isPropertyDeclaration(childNode)) {
                    if (childNode.modifiers?.find(m => m.kind === ts.SyntaxKind.StaticKeyword)) {
                        continue;
                    }
                    clazzProps.push(ts.factory.createPropertyAssignment(ts.factory.createIdentifier(childNode.name.getText()), getPropertyConfig(childNode.type)));
                }
            }
            const optionsProps = [
                ts.factory.createPropertyAssignment(ts.factory.createIdentifier("properties"), ts.factory.createObjectLiteralExpression(clazzProps))
            ];
            return ts.factory.updateDecorator(node, ts.factory.updateCallExpression(call, call.expression, undefined, call.arguments.concat(ts.factory.createObjectLiteralExpression(optionsProps))));
        }
    }
    return node;
}
