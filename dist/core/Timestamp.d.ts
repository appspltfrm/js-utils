export interface Timestamp {
    toMillis(): number;
    toDate(): Date;
}
declare global {
    interface Date extends Timestamp {
    }
}
export declare function implementTimestampInDate(): void;
