export function enumValues<T>(enumClass: any): T[] {

    let values: T[] = [];

    for (let key in enumClass) {
        if (typeof enumClass[key] === "number" && enumClass[enumClass[key]]) {
            values.push(enumClass[key as any]);
        }
    }

    return values;
}
