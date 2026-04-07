/**
 * Calculates the difference in milliseconds between UTC and a specific time zone at a given date.
 *
 * It uses the `Intl.DateTimeFormat` API to correctly account for daylight saving
 * time shifts in the target time zone.
 *
 * @param timeZone The IANA time zone name (e.g., "America/New_York").
 * @param date The date to calculate the offset for (defaults to now).
 * @returns The offset in milliseconds (UTC time - local time zone time).
 *
 * @example
 * ```typescript
 * const offset = timeZoneOffset("Europe/Warsaw");
 * ```
 */
export function timeZoneOffset(timeZone: string, date?: Date): number {

  if (!date) {
    date = new Date();
  }

  const utcDateTime = new Date(date.toLocaleString("en-US", {timeZone: "utc"}));
  const tzDateTime = new Date(date.toLocaleString("en-US", {timeZone}));
  return (utcDateTime.getTime() - tzDateTime.getTime());
}
