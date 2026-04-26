/**
 * A universal interface for managing application preferences and settings.
 * It provides a way to interact with data collections (like database tables or
 * localStorage namespaces) in a consistent way.
 */
export interface PreferencesContainer {
    /**
       * Sets a value for a specific key in a collection.
       * @param collection The name of the collection.
       * @param key The unique key for the preference item.
       * @param value The value to set (can be a full object or partial if merging).
       * @param options Optional settings like merge strategies.
       */
    set<Key = any, Value = any>(collection: string, key: Key, value: Value | Partial<Value>, options?: PreferencesSetOptions): Promise<PreferencesItem<Key, Value>>;
    /**
       * Updates an existing preference item by merging changes.
       * @throws Error if the key does not exist.
       */
    update<Key = any, Value = any>(collection: string, key: Key, value: Partial<Value>): Promise<PreferencesItem<Key, Value>>;
    /**
       * Retrieves a preference item by its key.
       * @returns The item or undefined if not found.
       */
    get<Key = any, Value = any>(collection: string, key: Key): Promise<PreferencesItem<Key, Value> | undefined>;
    /**
       * Checks if a key exists in a collection.
       */
    exists(collection: string, key: any): Promise<boolean>;
    /**
       * Deletes all items in a specific collection.
       */
    deleteAll<Key = any, Value = any>(collection: string): Promise<PreferencesItem<Key, Value>[]>;
    /**
       * Deletes one or more items from a collection by their keys.
       */
    delete<Key = any, Value = any>(collection: string, ...keys: Key[]): Promise<PreferencesItem<Key, Value>[]>;
    /**
       * Retrieves multiple items from a collection.
       * If no keys are provided, it returns all items in the collection.
       */
    items<Key = any, Value = any>(collection: string, ...keys: Key[]): Promise<PreferencesItem<Key, Value>[]>;
    /**
       * Returns a reference to a specific collection for easier chaining.
       */
    collection<Key, Value>(name: string): PreferencesCollectionRef<Key, Value>;
    /**
       * Listens for changes in the container or a specific collection.
       * @param listener The callback function.
       * @param collection Optional collection name to filter events.
       * @returns An unsubscribe function.
       */
    listen<Key, Value>(listener: PreferencesItemEventListener, collection: string): () => void;
    listen(listener: PreferencesItemEventListener): () => void;
}
/**
 * Callback function for preference item events.
 */
export type PreferencesItemEventListener = (event: PreferencesItemEvent<any, any>) => void;
/**
 * Types of events that can occur on a preference item.
 */
export type PreferencesItemEventType = "create" | "update" | "delete";
/**
 * Represents an event that occurred in a preferences container.
 */
export interface PreferencesItemEvent<Key = any, Value = any> {
    readonly collection: string;
    readonly type: PreferencesItemEventType;
    readonly ref: PreferencesItemRef;
    readonly key: Key;
    readonly newValue: Value;
    readonly oldValue: Value;
}
/**
 * Represents a stored preference item with metadata.
 */
export interface PreferencesItem<Key = any, Value = any> {
    readonly ref: PreferencesItemRef<Key, Value>;
    readonly key: Key;
    readonly value: Value;
    readonly lastUpdate: number;
}
/**
 * Options for setting preference values.
 */
export interface PreferencesSetOptions {
    /**
       * Whether to merge the new value with the existing one.
       * - `true`: Shallow merge.
       * - `"deep"`: Deep recursive merge.
       */
    merge?: boolean | "deep";
}
/**
 * A reference to a specific preference item, providing convenient methods.
 */
export interface PreferencesItemRef<Key = any, Value = any> {
    readonly collection: PreferencesCollectionRef<Key, Value>;
    readonly key: Key;
    /**
       * Returns the timestamp of the last update.
       */
    lastUpdate(): Promise<number>;
    /**
       * Retrieves the current value of the item.
       */
    value(): Promise<Value>;
    /**
       * Deletes this item.
       */
    delete(): Promise<boolean>;
    /**
       * Sets a new value for this item.
       */
    set(value: Value): Promise<PreferencesItem<Key, Value>>;
    set(value: Value | Partial<Value>, options?: PreferencesSetOptions): Promise<PreferencesItem<Key, Value>>;
    /**
       * Updates this item with partial changes.
       */
    update(value: Partial<Value>): Promise<PreferencesItem<Key, Value>>;
}
export interface PreferencesItemValueRef<Value = any> extends PreferencesItemRef<any, Value> {
}
export interface PreferencesFilter<Key = any, Value = any> {
    (key: Key, value: Value): boolean;
}
/**
 * A reference to a collection of preferences.
 */
export interface PreferencesCollectionRef<Key = any, Value = any> {
    readonly name: string;
    readonly container: PreferencesContainer;
    /**
       * Listens for changes within this collection.
       */
    listen(listener: PreferencesItemEventListener): () => void;
    /**
       * Returns a reference to a specific item in this collection.
       */
    itemRef<V = Value>(key: Key): PreferencesItemRef<Key, V>;
    /**
       * Retrieves a full preference item by its key.
       */
    item<V = Value>(key: Key): Promise<PreferencesItem<Key, V>>;
    /**
       * Retrieves multiple items by their keys. If no keys provided, returns all.
       */
    items(...keys: Key[]): Promise<PreferencesItem<Key, Value>[]>;
    items(): Promise<PreferencesItem<Key, Value>[]>;
    /**
       * Sets a value for a key in this collection.
       */
    set(key: Key, value: Value): Promise<PreferencesItem<Key, Value>>;
    set(key: Key, value: Value | Partial<Value>, options?: PreferencesSetOptions): Promise<PreferencesItem<Key, Value>>;
    /**
       * Updates an existing item with partial changes.
       */
    update(key: Key, value: Partial<Value>): Promise<PreferencesItem<Key, Value>>;
    /**
       * Checks if a key exists in this collection.
       */
    exists(key: Key): Promise<boolean>;
    /**
       * Retrieves only the value for a specific key.
       */
    value<V = Value>(key: Key): Promise<V>;
    /**
       * Retrieves values for multiple keys. If no keys provided, returns all values.
       */
    values(...keys: Key[]): Promise<Value[]>;
    values(): Promise<Value[]>;
    /**
       * Deletes items by their keys.
       */
    delete(...keys: Key[]): Promise<PreferencesItem<Key, Value>[]>;
    /**
       * Deletes all items in this collection.
       */
    deleteAll(): Promise<PreferencesItem<Key, Value>[]>;
}
