import { PreferencesCollectionRef, PreferencesContainer, PreferencesItem, PreferencesItemEventListener, PreferencesSetOptions } from "./interfaces.js";
export declare class PreferencesCollectionRefImpl<Key, Value> implements PreferencesCollectionRef<Key, Value> {
    readonly container: PreferencesContainer;
    readonly name: string;
    constructor(container: PreferencesContainer, name: string);
    itemRef(key: Key): any;
    items(): Promise<PreferencesItem<Key, Value>[]>;
    delete(...keys: Key[]): Promise<PreferencesItem[]>;
    deleteAll(): Promise<PreferencesItem[]>;
    exists(key: Key): Promise<boolean>;
    item(key: Key): any;
    set(key: Key, value: Value | Partial<Value>, options?: PreferencesSetOptions): Promise<PreferencesItem<Key, Value>>;
    update(key: Key, value: Partial<Value>): Promise<PreferencesItem<Key, Value>>;
    value(key: Key): Promise<any>;
    values(): Promise<Value[]>;
    listen(listener: PreferencesItemEventListener): () => void;
}
