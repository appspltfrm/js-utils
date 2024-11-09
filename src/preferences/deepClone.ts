export function deepClone<T>(obj: T) {

    if (obj === undefined || obj === null || typeof obj === "string" || typeof obj === "number" || typeof obj === "boolean") {
        return obj;
    }

    return JSON.parse(JSON.stringify(obj));
}
