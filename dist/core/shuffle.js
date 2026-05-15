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
export function shuffle(array) {
    const result = array.slice();
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}
//# sourceMappingURL=shuffle.js.map