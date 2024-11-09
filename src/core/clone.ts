export const clone = Symbol("@appspltfrm/js-utils/core/clone");

export interface Clone<T> {
    [clone](): T;
}
