export function getPrototypesTree(thiz: any): any[] {
    const types: any[] = [];

    let prototype: any = Object.getPrototypeOf(thiz);
    while (prototype.constructor !== Object) {
        types.push(prototype);
        prototype = Object.getPrototypeOf(prototype);
    }

    return types;
}
