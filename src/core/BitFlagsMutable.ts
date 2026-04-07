import {BitFlags} from "./BitFlags.js";
import {clone, Clone} from "./clone.js";

/**
 * A utility class for mutable bit flag operations.
 *
 * Each operation (add, remove, toggle) modifies the current instance and returns it.
 * This class inherits from the immutable `BitFlags` but overrides operations to provide mutability.
 *
 * @example
 * ```typescript
 * const permissions = new BitFlagsMutable(0);
 * permissions.add(1).add(2); // Mutates the instance
 * console.log(permissions.has(1)); // true
 * console.log(permissions.has(2)); // true
 * ```
 */
export class BitFlagsMutable extends BitFlags implements Clone<BitFlagsMutable> {

  /**
	 * Creates a new instance of BitFlagsMutable.
	 * @param value The initial numeric value representing bit flags. Defaults to 0.
	 */
  constructor (value?: number) {
    super(value);
  }

  /**
	 * Adds the specified flag to the current instance.
	 * @param flag The bit flag to add.
	 * @returns The current BitFlagsMutable instance for chaining.
	 */
  add(flag: number) : BitFlagsMutable {
    this._value |= flag;
    return this;
  }

  /**
	 * Removes the specified flag from the current instance.
	 * @param flag The bit flag to remove.
	 * @returns The current BitFlagsMutable instance for chaining.
	 */
  remove(flag: number) : BitFlagsMutable {
    this._value &= ~flag;
    return this;
  }

  /**
	 * Toggles the specified flag in the current instance.
	 * @param flag The bit flag to toggle.
	 * @returns The current BitFlagsMutable instance for chaining.
	 */
  toggle(flag: number) : BitFlagsMutable {
    this._value ^= flag;
    return this;
  }

  /**
	 * Creates a clone of the current BitFlagsMutable instance.
	 * @returns A new BitFlagsMutable instance with the same value.
	 */
  [clone](): BitFlagsMutable {
    return new BitFlagsMutable(this._value);
  }
}
