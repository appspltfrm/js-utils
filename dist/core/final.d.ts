/**
 * A property decorator that makes a field "final" by preventing further
 * modifications after its initial assignment.
 *
 * It converts the property into a getter-only property. For non-static
 * fields, it waits for the first assignment before locking the value.
 *
 * @param target The prototype or constructor of the class.
 * @param propertyKey The name of the property.
 *
 * @example
 * ```typescript
 * class User {
 *   @final
 *   readonly id: string;
 *
 *   constructor(id: string) {
 *     this.id = id; // First assignment works
 *     // this.id = "new"; // Throws or fails silently depending on strict mode
 *   }
 * }
 * ```
 */
export declare function final(target: any, propertyKey: string): void;
