/**
 * Interface for classes that provide a custom JSON type name.
 *
 * When a class implements this, the `jsonTypeName` value will be used
 * in the `@type` property during serialization.
 */
export interface JsonTypeName {
  /**
     * The unique name for this type in JSON representation.
     */
  readonly jsonTypeName: string;
}
