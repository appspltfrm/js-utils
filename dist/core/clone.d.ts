export declare const clone: unique symbol;
export interface Clone<T> {
    [clone](): T;
}
