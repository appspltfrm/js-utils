/**
 * Returns a new array with the elements of the input shuffled in a uniformly
 * random order using the Fisher–Yates algorithm.
 *
 * The input array is not mutated.
 *
 * @example
 * ```typescript
 * shuffle([1, 2, 3, 4]); // e.g. [3, 1, 4, 2]
 * ```
 */
export declare function shuffle<T>(array: readonly T[]): T[];
