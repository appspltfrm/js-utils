/**
 * Extracts numeric values from a native TypeScript enum.
 *
 * Note: This is specifically for native `enum` declarations, not the
 * custom `Enum` class provided by this library.
 *
 * @param enumClass The native TypeScript enum.
 * @returns An array of numeric values present in the enum.
 *
 * @example
 * ```typescript
 * enum Status { ACTIVE = 1, INACTIVE = 2 }
 * const values = enumValues<number>(Status); // [1, 2]
 * ```
 */
export function enumValues<T>(enumClass: any): T[] {

  let values: T[] = [];

  for (let key in enumClass) {
    if (typeof enumClass[key] === "number" && enumClass[enumClass[key]]) {
      values.push(enumClass[key as any]);
    }
  }

  return values;
}
