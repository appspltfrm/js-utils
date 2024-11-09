export function pipe(arg, firstFn, ...fns) {
    return fns.reduce((acc, fn) => fn(acc), firstFn(arg));
}
//# sourceMappingURL=pipe.js.map