"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = transformer;
const ts = __importStar(require("typescript"));
function transformer(program) {
    return (context) => (file) => {
        return visitNodeAndChildren(file, program, context);
    };
}
function visitNodeAndChildren(node, program, context) {
    return ts.visitEachChild(visitNode(node, program), childNode => visitNodeAndChildren(childNode, program, context), context);
}
function visitNode(node, program) {
    const typeChecker = program.getTypeChecker();
    if (ts.isDecorator(node) && ts.isClassDeclaration(node.parent) && ts.isCallExpression(node.expression)) {
        const call = node.expression;
        if (ts.isIdentifier(call.expression) && call.expression.getText() === "serializable") {
            const clazzProps = [];
            const clazz = node.parent;
            // for (const property of typeChecker.getPropertiesOfType(typeChecker.getTypeAtLocation(node.parent))) {
            //     console.log(property.name);
            //     clazzProps.push(ts.factory.createPropertyAssignment(ts.factory.createIdentifier(property.name), ts.factory.createObjectLiteralExpression()));
            // }
            for (const childNode of clazz.members) {
                if (ts.isPropertyDeclaration(childNode)) {
                    if (!childNode.type || childNode.modifiers?.find(m => m.kind === ts.SyntaxKind.StaticKeyword)) {
                        continue;
                    }
                    clazzProps.push(ts.factory.createPropertyAssignment(ts.factory.createIdentifier(childNode.name.getText()), ts.factory.createObjectLiteralExpression()));
                }
            }
            return ts.factory.updateDecorator(node, ts.factory.updateCallExpression(call, call.expression, null, call.arguments.concat(ts.factory.createObjectLiteralExpression([
                ts.factory.createPropertyAssignment(ts.factory.createIdentifier("properties"), ts.factory.createObjectLiteralExpression(clazzProps))
            ]))));
        }
    }
    // if (isKeysImportExpression(node)) {
    //     return;
    // }
    // if (!isKeysCallExpression(node, typeChecker)) {
    //     return node;
    // }
    // if (!node.typeArguments) {
    //     return ts.createArrayLiteral([]);
    // }
    // const type = typeChecker.getTypeFromTypeNode(node.typeArguments[0]);
    // const properties = typeChecker.getPropertiesOfType(type);
    // return ts.createArrayLiteral(properties.map(property => ts.createLiteral(property.name)));
    return node;
}
