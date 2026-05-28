import * as ts from "typescript";
import {createSerializableTransformer} from "./transformer.js";

export default function transformer(program: ts.Program): ts.TransformerFactory<ts.SourceFile> {
  return createSerializableTransformer(program);
}
