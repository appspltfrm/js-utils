#!/usr/bin/env node
import * as path from "node:path";
import * as process from "node:process";
import {formatJson, printReport, summarize} from "./_printReport.js";
import {runValidateSerializable} from "./_runValidateSerializable.js";

function printUsage(): void {
  console.error("Usage: appspltfrm-js-utils-validate-serializable [paths...] [options]");
  console.error("");
  console.error("Validates @serializable classes: checks that every field has @property() and");
  console.error("that the right type argument is present when the field is a class.");
  console.error("");
  console.error("Options:");
  console.error("  --tsconfig <path>       Path to tsconfig.json (default: ./tsconfig.json)");
  console.error("  --include <glob>        Glob filter on absolute fileName (repeatable)");
  console.error("  --json                  Emit JSON to stdout");
  console.error("  --warnings-as-errors    Exit 1 if any warnings are produced");
  console.error("  --help, -h              Show this help");
  console.error("");
  console.error("Positional <paths...>     Absolute path prefixes to restrict the scan");
  console.error("");
  console.error("Exit codes: 0 clean, 1 errors (or warnings with --warnings-as-errors), 2 bad usage");
}

interface ParsedArgs {
  tsconfig: string;
  include: string[];
  paths: string[];
  json: boolean;
  warningsAsErrors: boolean;
}

function parseArgs(argv: string[]): ParsedArgs {
  const out: ParsedArgs = {
    tsconfig: "./tsconfig.json",
    include: [],
    paths: [],
    json: false,
    warningsAsErrors: false
  };

  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--tsconfig") {
      const v = argv[++i];
      if (!v) {
        console.error("--tsconfig requires a value");
        process.exit(2);
      }
      out.tsconfig = v;
    } else if (a === "--include") {
      const v = argv[++i];
      if (!v) {
        console.error("--include requires a value");
        process.exit(2);
      }
      out.include.push(v);
    } else if (a === "--json") {
      out.json = true;
    } else if (a === "--warnings-as-errors") {
      out.warningsAsErrors = true;
    } else if (a === "--help" || a === "-h") {
      printUsage();
      process.exit(0);
    } else if (a.startsWith("--")) {
      console.error(`Unknown flag: ${a}`);
      printUsage();
      process.exit(2);
    } else {
      out.paths.push(a);
    }
  }

  return out;
}

function main(): void {
  const parsed = parseArgs(process.argv.slice(2));

  const tsconfigPath = path.resolve(parsed.tsconfig);
  const filterPaths = parsed.paths.length > 0 ? parsed.paths.map(p => path.resolve(p)) : undefined;

  const diagnostics = runValidateSerializable({
    tsconfigPath,
    filterPaths,
    include: parsed.include.length > 0 ? parsed.include : undefined
  });

  let summary;
  if (parsed.json) {
    process.stdout.write(formatJson(diagnostics) + "\n");
    summary = summarize(diagnostics);
  } else {
    summary = printReport(diagnostics, process.cwd());
  }

  if (summary.errors > 0) {
    process.exit(1);
  }
  if (parsed.warningsAsErrors && summary.warnings > 0) {
    process.exit(1);
  }
  process.exit(0);
}

try {
  main();
} catch (err) {
  console.error(err instanceof Error ? err.stack ?? err.message : String(err));
  process.exit(2);
}
