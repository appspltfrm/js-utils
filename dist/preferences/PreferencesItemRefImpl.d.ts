import { PreferencesCollectionRef, PreferencesItemRef, PreferencesSetOptions } from "./interfaces.js";
export declare class PreferencesItemRefImpl<Key, Value> implements PreferencesItemRef<Key, Value> {
    readonly collection: PreferencesCollectionRef<Key, Value>;
    readonly key: Key;
    constructor(collection: PreferencesCollectionRef<Key, Value>, key: Key);
    delete(): Promise<boolean>;
    value(): Promise<Value>;
    lastUpdate(): Promise<number>;
    set(value: Value, options?: PreferencesSetOptions): Promise<import("./interfaces.js").PreferencesItem<Key, Value>>;
    update(value: Value): Promise<import("./interfaces.js").PreferencesItem<Key, Value>>;
}
