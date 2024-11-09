/**
 * @deprecated
 */
export declare class DateTimezone {
    static timezoneOffset(timezone: string, date?: Date): number;
    static fromJSON(json: any): DateTimezone;
    constructor(epoch: number, timezone?: string);
    constructor(date: Date, timezone?: string);
    readonly date: Date;
    readonly timezone: string;
    epoch(): number;
    toJSON(): {
        "@type": string;
        date: number;
        timezone: string;
    };
}
