export interface PreferencesContainer {

    set<Key = any, Value = any>(collection: string, key: Key, value: Value | Partial<Value>, options?: PreferencesSetOptions): Promise<PreferencesItem<Key, Value>>;

    update<Key = any, Value = any>(collection: string, key: Key, value: Partial<Value>): Promise<PreferencesItem<Key, Value>>;

    get<Key = any, Value = any>(collection: string, key: Key): Promise<PreferencesItem<Key, Value>>;

    exists(collection: string, key: any): Promise<boolean>;

    deleteAll<Key = any, Value = any>(collection: string): Promise<PreferencesItem<Key, Value>[]>;

    delete<Key = any, Value = any>(collection: string, ...keys: Key[]): Promise<PreferencesItem<Key, Value>[]>;

    items<Key = any, Value = any>(collection: string, ...keys: Key[]): Promise<PreferencesItem<Key, Value>[]>;

    collection<Key, Value>(name: string): PreferencesCollectionRef<Key, Value>;

    listen<Key, Value>(listener: PreferencesItemEventListener, collection: string): () => void;

    listen(listener: PreferencesItemEventListener): () => void;
}

export type PreferencesItemEventListener = (event: PreferencesItemEvent<any, any>) => void;

export type PreferencesItemEventType = "create" | "update" | "delete";

export interface PreferencesItemEvent<Key = any, Value = any> {
    readonly collection: string;
    readonly type: PreferencesItemEventType;
    readonly ref: PreferencesItemRef;
    readonly key: Key;
    readonly newValue: Value;
    readonly oldValue: Value;
}

export interface PreferencesItem<Key = any, Value = any> {
    readonly ref: PreferencesItemRef<Key, Value>;
    readonly key: Key;
    readonly value: Value;
    readonly lastUpdate: number;
}

export interface PreferencesSetOptions {
    merge?: boolean | "deep";
}

export interface PreferencesItemRef<Key = any, Value = any> {

    readonly collection: PreferencesCollectionRef<Key, Value>;

    readonly key: Key;

    lastUpdate(): Promise<number>;

    value(): Promise<Value>;

    delete(): Promise<boolean>;

    set(value: Value): Promise<PreferencesItem<Key, Value>>;

    set(value: Value | Partial<Value>, options?: PreferencesSetOptions): Promise<PreferencesItem<Key, Value>>;

    update(value: Value): Promise<PreferencesItem<Key, Value>>;
}

export interface PreferencesItemValueRef<Value = any> extends PreferencesItemRef<any, Value> {
}

export interface PreferencesFilter<Key = any, Value = any> {
    (key: Key, value: Value): boolean;
}

export interface PreferencesCollectionRef<Key = any, Value = any> {

    readonly name: string;

    readonly container: PreferencesContainer;

    listen(listener: PreferencesItemEventListener): () => void;

    itemRef<V = Value>(key: Key): PreferencesItemRef<Key, V>;

    item<V = Value>(key: Key): Promise<PreferencesItem<Key, V>>;

    items(...keys: Key[]): Promise<PreferencesItem<Key, Value>[]>;

    items(): Promise<PreferencesItem<Key, Value>[]>;

    set(key: Key, value: Value): Promise<PreferencesItem<Key, Value>>;

    set(key: Key, value: Value | Partial<Value>, options?: PreferencesSetOptions): Promise<PreferencesItem<Key, Value>>;

    update(key: Key, value: Partial<Value>): Promise<PreferencesItem<Key, Value>>;

    exists(key: Key): Promise<boolean>;

    value<V = Value>(key: Key): Promise<V>;

    values(...keys: Key[]): Promise<Value[]>;

    values(): Promise<Value[]>;

    delete(...keys: Key[]): Promise<PreferencesItem<Key, Value>[]>;

    deleteAll(): Promise<PreferencesItem<Key, Value>[]>;
}
