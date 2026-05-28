import { SerializableDiagnostic } from "./_SerializableDiagnostic.js";
export interface RunValidateSerializableOptions {
    tsconfigPath: string;
    /** Absolute path prefixes; if set, only files starting with one of them are checked. */
    filterPaths?: string[];
    /** Simple glob filters (`**` and `*`) against the absolute fileName. */
    include?: string[];
}
export declare function runValidateSerializable(opts: RunValidateSerializableOptions): SerializableDiagnostic[];
