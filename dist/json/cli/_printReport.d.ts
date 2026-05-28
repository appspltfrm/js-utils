import { SerializableDiagnostic } from "./_SerializableDiagnostic.js";
export interface ReportSummary {
    errors: number;
    warnings: number;
    files: number;
}
export declare function summarize(diagnostics: SerializableDiagnostic[]): ReportSummary;
export declare function printReport(diagnostics: SerializableDiagnostic[], cwd: string): ReportSummary;
export declare function formatJson(diagnostics: SerializableDiagnostic[]): string;
