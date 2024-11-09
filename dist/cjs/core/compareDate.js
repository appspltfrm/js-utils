"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareDate = compareDate;
function compareDate(first, second) {
    return (first ? first.getTime() : 0) - (second ? second.getTime() : 0);
}
//# sourceMappingURL=compareDate.js.map