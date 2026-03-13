export declare function topLevelAwaits(...inputs: Promise<any>[]): void;
export declare function topLevelAwait<T>(input: Promise<T>): TopLevelAwaiter<T>;
export declare function waitTopLevelAwait(): Promise<void>;
export type TopLevelAwaiter<T> = Promise<T> & {
    error?: () => any;
    value: () => T | undefined;
};
