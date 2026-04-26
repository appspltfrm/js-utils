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
export declare function compareDate(first: Date, second: Date, ignoreTime?: boolean): number;
