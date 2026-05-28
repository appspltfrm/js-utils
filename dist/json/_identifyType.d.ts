/**
 * Identifies the best-matching constructor/class for a given object.
 *
 * It handles primitives (Boolean, String, Number), native objects (Date, Array),
 * and custom class instances.
 *
 * @param object The object to identify.
 * @returns The identified constructor function or the base `Object`.
 */
export declare function identifyType(object: any): any;
