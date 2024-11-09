import * as ts from "typescript";

export default function transformer(program: ts.Program): ts.TransformerFactory<ts.SourceFile> {
    return (context: ts.TransformationContext) => (file: ts.SourceFile) => {
        return visitNodeAndChildren(file, program, context);
    }
}

function visitNodeAndChildren(node: ts.SourceFile, program: ts.Program, context: ts.TransformationContext): ts.SourceFile;
function visitNodeAndChildren(node: ts.Node, program: ts.Program, context: ts.TransformationContext): ts.Node | undefined;
function visitNodeAndChildren(node: ts.Node, program: ts.Program, context: ts.TransformationContext): ts.Node | undefined {
    return ts.visitEachChild(visitNode(node, program), childNode => visitNodeAndChildren(childNode, program, context), context);
}

function visitNode(node: ts.SourceFile, program: ts.Program): ts.SourceFile;
function visitNode(node: ts.Node, program: ts.Program): ts.Node | undefined;
function visitNode(node: ts.Node, program: ts.Program): ts.Node | undefined {
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

                    clazzProps.push(
                        ts.factory.createPropertyAssignment(
                            ts.factory.createIdentifier(childNode.name.getText()),
                            ts.factory.createObjectLiteralExpression()
                        )
                    );
                }
            }

            return ts.factory.updateDecorator(node,
                ts.factory.updateCallExpression(call, call.expression, null,
                    call.arguments.concat(
                        ts.factory.createObjectLiteralExpression([
                            ts.factory.createPropertyAssignment(ts.factory.createIdentifier("properties"), ts.factory.createObjectLiteralExpression(clazzProps))]
                        )
                    )
                )
            );
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
