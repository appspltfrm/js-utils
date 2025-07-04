import { LocalDate } from "./LocalDate";
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