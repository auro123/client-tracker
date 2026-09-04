/**
 * Formats a `@db.Date` value (stored and returned as UTC midnight) as a
 * calendar date. Uses the UTC getters so the local/server timezone never
 * shifts the day — the value has no time component to convert.
 */
export function formatDueDate(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}
