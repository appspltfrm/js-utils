"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toFloat = toFloat;
exports.toInteger = toInteger;
exports.toString = toString;
exports.isArrayContainsInstanceOf = isArrayContainsInstanceOf;
exports.mapEntries = mapEntries;
function toFloat(value) {
    if (typeof value === "number") {
        return value;
    }
    else if (typeof value === "string") {
        return parseFloat(value);
    }
    else if (value) {
        throw `Cannot convert value "${value}" to float`;
    }
    else {
        return value;
    }
}
function toInteger(value) {
    if (typeof value === "number") {
        return value;
    }
    else if (typeof value === "string") {
        return parseInt(value);
    }
    else if (value) {
        throw `Cannot convert value "${value}" to integer`;
    }
    else {
        return value;
    }
}
function toString(value) {
    if (typeof value === "string") {
        return value;
    }
    else if (value === undefined || value === null) {
        return value;
    }
    else {
        return value.toString();
    }
}
function isArrayContainsInstanceOf(value, type) {
    if (Array.isArray(value)) {
        for (let a of value) {
            if (a instanceof type) {
                return true;
            }
        }
    }
    return false;
}
function mapEntries(map) {
    let array = [];
    for (let key in map) {
        array.push({ key: key, value: map[key] });
    }
    return array;
}
//# sourceMappingURL=types.js.map