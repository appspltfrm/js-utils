import { clone, Clone } from "./clone.js";
/**
 * A utility class for immutable bit flag operations.
 *
 * Each operation (add, remove, toggle) returns a new instance of `BitFlags`.
 * This ensures the original instance remains unchanged, following immutable patterns.
 *
 * @example
 * ```typescript
 * const permissions = new BitFlags(0);
 * const withRead = permissions.add(1); // 1
 * const withWrite = withRead.add(2); // 3
 * console.log(withWrite.has(1)); // true
 * console.log(withWrite.has(2)); // true
 * ```
 */
export declare class BitFlags implements Clone<BitFlags> {
    /**
       * Creates a new instance of BitFlags.
       * @param value The initial numeric value representing bit flags. Defaults to 0.
       */
    constructor(value?: number);
    protected _value: number;
    /**
       * Returns the current numeric value of the flags.
       */
    get value(): number;
    /**
       * Checks if a specific flag (or combination of flags) is set.
       * @param flag The bit flag to check.
       * @returns `true` if the flag is set, `false` otherwise.
       */
    has(flag: number): boolean;
    /**
       * Checks if a specific flag (or combination of flags) is NOT set.
       * @param flag The bit flag to check.
       * @returns `true` if the flag is not set, `false` otherwise.
       */
    not(flag: number): boolean;
    /**
       * Returns a new BitFlags instance with the specified flag added.
       * @param flag The bit flag to add.
       * @returns A new BitFlags instance.
       */
    add(flag: number): BitFlags;
    /**
       * Returns a new BitFlags instance with the specified flag removed.
       * @param flag The bit flag to remove.
       * @returns A new BitFlags instance.
       */
    remove(flag: number): BitFlags;
    /**
       * Returns a new BitFlags instance with the specified flag toggled (swapped).
       * @param flag The bit flag to toggle.
       * @returns A new BitFlags instance.
       */
    toggle(flag: number): BitFlags;
    /**
       * Creates a clone of the current BitFlags instance.
       * @returns A new BitFlags instance with the same value.
       */
    [clone](): BitFlags;
}
