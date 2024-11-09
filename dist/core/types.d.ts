export declare function toFloat(value: string | number): number;
export declare function toInteger(value: string | number): number;
export declare function toString(value: any): string;
export declare function isArrayContainsInstanceOf(value: any, type: Function): boolean;
export declare function mapEntries<T>(map: {
    [key: string]: T;
}): {
    key: string;
    value: T;
}[];
