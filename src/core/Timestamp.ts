export interface Timestamp {
    toMillis(): number;
    toDate(): Date;
}

declare global {
    interface Date extends Timestamp {
    }
}

export function implementTimestampInDate() {

    if (Date.prototype.toMillis) {
        return;
    }

    Date.prototype.toMillis = function() {
        return this.getTime();
    }

    Date.prototype.toDate = function() {
        return new Date(this.getTime());
    }

}

implementTimestampInDate();