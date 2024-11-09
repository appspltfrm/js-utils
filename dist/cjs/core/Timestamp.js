"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.implementTimestampInDate = implementTimestampInDate;
function implementTimestampInDate() {
    if (Date.prototype.toMillis) {
        return;
    }
    Date.prototype.toMillis = function () {
        return this.getTime();
    };
    Date.prototype.toDate = function () {
        return new Date(this.getTime());
    };
}
implementTimestampInDate();
//# sourceMappingURL=Timestamp.js.map