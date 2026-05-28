import { PreferencesCollectionRef, PreferencesItem, PreferencesItemRef } from "./interfaces.js";
export declare class PreferencesItemImpl<Key, Value> implements PreferencesItem<Key, Value> {
    constructor(collection: PreferencesCollectionRef, key: Key, value: Value, lastUpdate: number);
    get key(): any;
    readonly ref: PreferencesItemRef;
    readonly value: Value;
    readonly lastUpdate: number;
}
