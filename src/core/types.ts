/**
 * Converts a string or number to a float.
 * @param value The value to convert.
 * @returns The converted float value.
 * @throws Error if the value cannot be converted.
 */
export function toFloat(value: string | number): number {
  if (typeof value === "number") {
    return value as number;
  } else if (typeof value === "string") {
    return parseFloat(value);
  } else if (value) {
    throw new Error(`Cannot convert value "${value}" to float`);
  } else {
    return value;
  }
}

/**
 * Converts a string or number to an integer.
 * @param value The value to convert.
 * @returns The converted integer value.
 * @throws Error if the value cannot be converted.
 */
export function toInteger(value: string | number): number {
  if (typeof value === "number") {
    return value as number;
  } else if (typeof value === "string") {
    return parseInt(value);
  } else if (value) {
    throw new Error(`Cannot convert value "${value}" to integer`);
  } else {
    return value;
  }
}

/**
 * Ensures a value is a string, calling `toString()` if necessary.
 * Returns null or undefined as is.
 */
export function toString(value: any): string {
  if (typeof value === "string") {
    return value;
  } else if (value === undefined || value === null) {
    return value;
  } else {
    return value.toString();
  }
}

/**
 * Checks if an array contains at least one instance of a specific class.
 */
export function isArrayContainsInstanceOf(value: any, type: Function): boolean {

  if (Array.isArray(value)) {
    for (let a of value) {
      if (a instanceof type) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Converts a key-value map into an array of entry objects.
 *
 * @deprecated Use native `Object.entries()` or `Map` instead.
 */
export function mapEntries<T>(map: {[key: string]: T}): {key: string, value: T}[] {

  let array: any[] = [];

  for (let key in map) {
    array.push({key: key, value: map[key]});
  }

  return array;
}
