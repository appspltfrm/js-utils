import { LocalDate } from "./LocalDate.js";
/**
 * Compares two dates and returns the difference in milliseconds.
 *
 * It correctly handles `LocalDate` instances by treating them as UTC-based
 * representations of the date and time they hold.
 *
 * @param first The first date to compare.
 * @param second The second date to compare.
 * @param ignoreTime If true, the time components (hours, minutes, etc.)
 *                   will be reset to zero before comparison.
 * @returns The difference `first.getTime() - second.getTime()`.
 *
 * @example
 * ```typescript
 * const d1 = new Date("2023-01-01T10:00:00Z");
 * const d2 = new Date("2023-01-01T15:00:00Z");
 * compareDate(d1, d2, true); // 0 (same day)
 * ```
 */
export function compareDate(first, second, ignoreTime = false) {
    let firstModified = false;
    let secondModified = false;
    if (first instanceof LocalDate) {
        first = new Date(first.getUTCFullYear(), first.getUTCMonth(), first.getUTCDate(), first.getUTCHours(), first.getUTCMinutes(), first.getUTCSeconds(), first.getUTCMilliseconds());
        firstModified = true;
    }
    if (second instanceof LocalDate) {
        second = new Date(second.getUTCFullYear(), second.getUTCMonth(), second.getUTCDate(), second.getUTCHours(), second.getUTCMinutes(), second.getUTCSeconds(), second.getUTCMilliseconds());
        secondModified = true;
    }
    if (ignoreTime) {
        if (!firstModified && first) {
            first = new Date(first.getTime());
        }
        if (!secondModified && second) {
            second = new Date(second.getTime());
        }
        first?.setUTCHours(0, 0, 0, 0);
        second?.setUTCHours(0, 0, 0, 0);
    }
    return (first ? first.getTime() : 0) - (second ? second.getTime() : 0);
}
//# sourceMappingURL=compareDate.js.map