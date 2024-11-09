export function identifyType(object) {
    if (object === undefined || object === null) {
        return Object;
    }
    else if (object.constructor === Boolean || typeof object === "boolean") {
        return Boolean;
    }
    else if (object.constructor === String || typeof object === "string") {
        return String;
    }
    else if (object.constructor === Number || typeof object === "number") {
        return Number;
    }
    else if (object.constructor === Date) {
        return Date;
    }
    else if (Array.isArray(object)) {
        return Object;
    }
    else if (typeof object === "function" && object.prototype) {
        return object;
    }
    else if (object && object.constructor) {
        return object.constructor;
    }
    else {
        return Object;
    }
}
//# sourceMappingURL=identifyType.js.map