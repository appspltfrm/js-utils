export function enumValues(enumClass) {
    let values = [];
    for (let key in enumClass) {
        if (typeof enumClass[key] === "number" && enumClass[enumClass[key]]) {
            values.push(enumClass[key]);
        }
    }
    return values;
}
//# sourceMappingURL=enums.js.map