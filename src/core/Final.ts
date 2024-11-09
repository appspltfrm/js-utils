/**
 * Turns static and non-static fields into getter-only, and therefor renders them "Final".
 * To use simply annotate the static or non-static field with: @Final
 *
 * @link http://stackoverflow.com/a/37778842
 */
export function Final(target: any, propertyKey: string) {
    const value: any = target[propertyKey];
    // if it currently has no value, then wait for the first setter-call
    // usually the case with non-static fields
    if (!value) {
        Object.defineProperty(target, propertyKey, {
            set: function (value: any) {
                Object.defineProperty(this, propertyKey, {
                    get: function () {
                        return value;
                    },
                    enumerable: true,
                    configurable: false
                });
            },
            enumerable: true,
            configurable: true
        });
    } else { // else, set it immediatly
        Object.defineProperty(target, propertyKey, {
            get: function () {
                return value;
            },
            enumerable: true
        });
    }
}