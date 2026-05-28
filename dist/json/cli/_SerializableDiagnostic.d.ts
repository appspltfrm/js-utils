export type SerializableDiagCode = "MISSING_PROPERTY_DECORATOR" | "MISSING_TYPE_ARG" | "MISSING_TYPE_ARG_IN_COLLECTION" | "TYPE_NOT_IN_TYPES_LIST" | "TYPE_NOT_IN_TYPES_LIST_IN_COLLECTION" | "UNION_TYPE_AMBIGUOUS";
export type SerializableDiagSeverity = "error" | "warning";
export interface SerializableDiagnostic {
    file: string;
    line: number;
    column: number;
    className: string;
    propName: string;
    code: SerializableDiagCode;
    severity: SerializableDiagSeverity;
    message: string;
}
