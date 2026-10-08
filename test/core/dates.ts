import {LocalDate} from "../../src/core/LocalDate.js";
import {NoTimeDate} from "../../src/core/NoTimeDate.js";

function assert(label: string, condition: boolean) {
  console.log(`${condition ? "PASS" : "FAIL"}: ${label}`);
  if (!condition) {
    process.exitCode = 1;
  }
}

//#region LocalDate

// Full-args field constructor (the shape all current call sites use)
const full = new LocalDate(2026, 6, 19, 12, 30, 45, 500);
assert("LocalDate full args is valid", !isNaN(full.getTime()));
assert("LocalDate full args fields", full.getFullYear() === 2026 && full.getMonth() === 6 && full.getDate() === 19
    && full.getHours() === 12 && full.getMinutes() === 30 && full.getSeconds() === 45 && full.getMilliseconds() === 500);

// Trailing optional args omitted — Date.UTC must not see explicit undefined
const noMs = new LocalDate(2026, 6, 19, 12, 0);
assert("LocalDate without seconds/ms is valid", !isNaN(noMs.getTime()));
assert("LocalDate without seconds/ms fields", noMs.getHours() === 12 && noMs.getMinutes() === 0
    && noMs.getSeconds() === 0 && noMs.getMilliseconds() === 0);

const yearMonthOnly = new LocalDate(2026, 6);
assert("LocalDate year+month only is valid", !isNaN(yearMonthOnly.getTime()));
assert("LocalDate year+month defaults to 1st midnight", yearMonthOnly.getDate() === 1 && yearMonthOnly.getHours() === 0
    && yearMonthOnly.getMinutes() === 0 && yearMonthOnly.getSeconds() === 0 && yearMonthOnly.getMilliseconds() === 0);

// Explicit undefined for optionals behaves like omission
const explicitUndefined = new LocalDate(2026, 6, undefined, undefined, undefined, undefined, undefined);
assert("LocalDate explicit undefined optionals is valid", !isNaN(explicitUndefined.getTime()));
assert("LocalDate explicit undefined equals omitted", explicitUndefined.getTime() === yearMonthOnly.getTime());

// Value-based constructors still work
assert("LocalDate from timestamp", new LocalDate(full.getTime()).getTime() === full.getTime());
assert("LocalDate from Date", new LocalDate(new Date(full.getTime())).getTime() === full.getTime());
assert("LocalDate fields are timezone-independent (UTC-backed)", new LocalDate(2023, 0, 1, 12, 0).getHours() === 12);

//#endregion

//#region NoTimeDate

const noTime = new NoTimeDate(2026, 6, 19);
assert("NoTimeDate full args is valid", !isNaN(noTime.getTime()));
assert("NoTimeDate fields", noTime.getFullYear() === 2026 && noTime.getMonth() === 6 && noTime.getDate() === 19);
assert("NoTimeDate time is always zero", noTime.getHours() === 0 && noTime.getMinutes() === 0
    && noTime.getSeconds() === 0 && noTime.getMilliseconds() === 0);

// The public overload requires `date`, but the implementation accepts undefined (plain-JS callers)
const noTimeNoDate = new NoTimeDate(2026, 6, undefined as unknown as number);
assert("NoTimeDate with undefined date is valid", !isNaN(noTimeNoDate.getTime()));
assert("NoTimeDate with undefined date defaults to 1st", noTimeNoDate.getDate() === 1);

assert("NoTimeDate from timestamp strips time", new NoTimeDate(full.getTime()).getTime() === noTime.getTime());

//#endregion
