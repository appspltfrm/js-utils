/**
 * Converts a string or number to a float.
 * @param value The value to convert.
 * @returns The converted float value.
 * @throws Error if the value cannot be converted.
 */
export declare function toFloat(value: string | number): number;
/**
 * Converts a string or number to an integer.
 * @param value The value to convert.
 * @returns The converted integer value.
 * @throws Error if the value cannot be converted.
 */
export declare function toInteger(value: string | number): number;
/**
 * Ensures a value is a string, calling `toString()` if necessary.
 * Returns null or undefined as is.
 */
export declare function toString(value: any): string;
/**
 * Checks if an array contains at least one instance of a specific class.
 */
export declare function isArrayContainsInstanceOf(value: any, type: Function): boolean;
/**
 * Converts a key-value map into an array of entry objects.
 *
 * @deprecated Use native `Object.entries()` or `Map` instead.
 */
export declare function mapEntries<T>(map: {
    [key: string]: T;
}): {
    key: string;
    value: T;
}[];
