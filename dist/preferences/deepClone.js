export function deepClone(obj) {
    if (obj === undefined || obj === null || typeof obj === "string" || typeof obj === "number" || typeof obj === "boolean") {
        return obj;
    }
    return JSON.parse(JSON.stringify(obj));
}
//# sourceMappingURL=deepClone.js.map