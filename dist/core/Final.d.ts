/**
 * Turns static and non-static fields into getter-only, and therefor renders them "Final".
 * To use simply annotate the static or non-static field with: @Final
 *
 * @link http://stackoverflow.com/a/37778842
 */
export declare function Final(target: any, propertyKey: string): void;
