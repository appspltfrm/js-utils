import { ContainerEventsManager } from "./ContainerEventsManager.js";
import { PreferencesCollectionRef, PreferencesContainer, PreferencesItem, PreferencesItemEvent, PreferencesSetOptions } from "./interfaces.js";
import { PreferencesItemImpl } from "./PreferencesItemImpl.js";
/**
 * An implementation of PreferencesContainer that uses Web Storage API
 * (`localStorage` or `sessionStorage`) for persistent or session-based storage.
 *
 * Data is serialized to JSON before being stored.
 *
 * @example
 * ```typescript
 * const container = new StoragePreferencesContainer(window.localStorage);
 * const userSettings = container.collection("user_settings");
 * await userSettings.set("theme", "dark");
 * ```
 */
export declare class StoragePreferencesContainer implements PreferencesContainer {
    private readonly storage;
    /**
       * Creates a new StoragePreferencesContainer.
       * @param storage The storage backend (e.g., localStorage or sessionStorage).
       */
    constructor(storage: typeof window.localStorage | typeof window.sessionStorage);
    protected readonly events: ContainerEventsManager;
    protected fireEvent(event: Partial<PreferencesItemEvent<any, any>>): void;
    private getStorageItem;
    private setStorageItem;
    private storageKey;
    private collectionAndKey;
    private newItem;
    /**
       * @inheritdoc
       */
    set(collection: string, key: any, value: any, options?: PreferencesSetOptions): Promise<PreferencesItemImpl<any, any>>;
    /**
       * @inheritdoc
       */
    get(collection: string, key: any): Promise<PreferencesItemImpl<any, any>>;
    /**
       * @inheritdoc
       */
    delete(collection: string, ...keys: any[]): Promise<PreferencesItem<any, any>[]>;
    /**
       * @inheritdoc
       */
    deleteAll(collection: string): Promise<PreferencesItem<any, any>[]>;
    /**
       * @inheritdoc
       */
    exists(collection: string, key: any): Promise<boolean>;
    /**
       * @inheritdoc
       */
    items(collection: string, keysToFilter?: any): Promise<PreferencesItem<any, any>[]>;
    /**
       * @inheritdoc
       */
    update<Key = any, Value = any>(collection: string, key: Key, changes: Partial<Value>): Promise<PreferencesItem<Key, Value>>;
    /**
       * @inheritdoc
       */
    collection<Key, Value>(name: string): PreferencesCollectionRef<Key, Value>;
    /**
       * @inheritdoc
       */
    listen(listener: (event: PreferencesItemEvent<any, any>) => void, collection?: string): () => void;
}
