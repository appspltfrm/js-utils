import * as path from "node:path";
import * as p from "@clack/prompts";
import {SerializableDiagnostic} from "./_SerializableDiagnostic.js";

export interface ReportSummary {
  errors: number;
  warnings: number;
  files: number;
}

export function summarize(diagnostics: SerializableDiagnostic[]): ReportSummary {
  let errors = 0;
  let warnings = 0;
  const files = new Set<string>();
  for (const d of diagnostics) {
    if (d.severity === "error") {
      errors++;
    } else {
      warnings++;
    }
    files.add(d.file);
  }
  return {errors, warnings, files: files.size};
}

//#region ANSI helpers
const useColor = process.stdout.isTTY && process.env.NO_COLOR !== "1";
const ansi = (code: string, s: string): string => useColor ? `\x1b[${code}m${s}\x1b[0m` : s;
const red = (s: string) => ansi("31", s);
const yellow = (s: string) => ansi("33", s);
const green = (s: string) => ansi("32", s);
const dim = (s: string) => ansi("2", s);
const bold = (s: string) => ansi("1", s);
const cyan = (s: string) => ansi("36", s);
//#endregion

export function printReport(diagnostics: SerializableDiagnostic[], cwd: string): ReportSummary {
  const summary = summarize(diagnostics);

  p.intro(bold("validate-serializable"));

  if (diagnostics.length === 0) {
    p.outro(green("No issues found."));
    return summary;
  }

  const byFile = groupByFile(diagnostics, cwd);
  const relPaths = [...byFile.keys()].sort((a, b) => a.localeCompare(b));

  for (const rel of relPaths) {
    const diags = byFile.get(rel)!;
    diags.sort((a, b) => a.line - b.line || a.column - b.column);
    p.note(formatFileBody(diags), rel);
  }

  const summaryLine = formatSummaryLine(summary);
  if (summary.errors > 0) {
    p.outro(red(summaryLine));
  } else if (summary.warnings > 0) {
    p.outro(yellow(summaryLine));
  } else {
    p.outro(green(summaryLine));
  }

  return summary;
}

function groupByFile(diagnostics: SerializableDiagnostic[], cwd: string): Map<string, SerializableDiagnostic[]> {
  const out = new Map<string, SerializableDiagnostic[]>();
  for (const d of diagnostics) {
    const rel = path.relative(cwd, d.file) || d.file;
    const list = out.get(rel);
    if (list) {
      list.push(d);
    } else {
      out.set(rel, [d]);
    }
  }
  return out;
}

function formatFileBody(diags: SerializableDiagnostic[]): string {
  const lines: string[] = [];
  for (const d of diags) {
    const icon = d.severity === "error" ? red("✖") : yellow("⚠");
    const loc = dim(`${d.line}:${d.column}`);
    const code = d.severity === "error" ? red(d.code) : yellow(d.code);
    const target = bold(`${d.className}.${d.propName}`);
    lines.push(`${icon} ${loc}  ${target}  ${dim("[")}${code}${dim("]")}`);
    lines.push(`  ${cyan("→")} ${d.message}`);
  }
  return lines.join("\n");
}

function formatSummaryLine(summary: ReportSummary): string {
  const parts: string[] = [];
  parts.push(`${summary.errors} error${summary.errors === 1 ? "" : "s"}`);
  parts.push(`${summary.warnings} warning${summary.warnings === 1 ? "" : "s"}`);
  parts.push(`${summary.files} file${summary.files === 1 ? "" : "s"}`);
  return parts.join("  ·  ");
}

export function formatJson(diagnostics: SerializableDiagnostic[]): string {
  const summary = summarize(diagnostics);
  return JSON.stringify({diagnostics, summary}, null, 2);
}
