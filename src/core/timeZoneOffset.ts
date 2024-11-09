export function timeZoneOffset(timeZone: string, date?: Date): number {

    if (!date) {
        date = new Date();
    }

    const utcDateTime = new Date(date.toLocaleString("en-US", {timeZone: "utc"}));
    const tzDateTime = new Date(date.toLocaleString("en-US", {timeZone}));
    return (utcDateTime.getTime() - tzDateTime.getTime());
}
