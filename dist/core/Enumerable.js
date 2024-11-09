export function Enumerable(isEnumerable) {
    return (target, propertyKey, descriptor) => {
        descriptor.enumerable = isEnumerable;
        return descriptor;
    };
}
//# sourceMappingURL=Enumerable.js.map