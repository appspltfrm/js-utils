import * as ts from "typescript";
export interface AliasEntry {
    find: string;
    replacement: string;
}
export interface CreateSerializableTransformerOptions {
    /**
     * Reverse-alias list used when computing module specifiers from absolute file paths.
     * Longest `replacement` match wins. Pass Vite's `resolve.alias` here (normalized to
     * `{find, replacement}` pairs).
     *
     * Without aliases, the transformer falls back to `path.relative` (Node resolution) or
     * raw target path (other resolutions) — matching the original behavior used by the `tsc`
     * + `ts-patch` integration in `@appspltfrm/data`.
     */
    aliasReverse?: AliasEntry[];
}
export declare function createSerializableTransformer(program: ts.Program, options?: CreateSerializableTransformerOptions): ts.TransformerFactory<ts.SourceFile>;
