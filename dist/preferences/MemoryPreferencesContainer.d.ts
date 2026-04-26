import { ContainerEventsManager } from "./ContainerEventsManager.js";
import { PreferencesCollectionRef, PreferencesContainer, PreferencesItem, PreferencesItemEvent, PreferencesItemEventListener, PreferencesSetOptions } from "./interfaces.js";
import { PreferencesItemImpl } from "./PreferencesItemImpl.js";
/**
 * Internal representation of an item in MemoryPreferencesContainer.
 */
export interface MemoryPreferencesContainerItem {
    key: any;
    value: any;
    collection: string;
    lastUpdate: number;
}
/**
 * An implementation of PreferencesContainer that stores data in memory (RAM).
 * Data is volatile and will be lost when the application is restarted.
 *
 * @example
 * ```typescript
 * const container = new MemoryPreferencesContainer();
 * const prefs = container.collection("app");
 * await prefs.set("theme", "light");
 * ```
 */
export declare class MemoryPreferencesContainer implements PreferencesContainer {
    protected readonly memory: MemoryPreferencesContainerItem[];
    protected readonly events: ContainerEventsManager;
    protected fireEvent(event: Partial<PreferencesItemEvent<any, any>>): void;
    private newItem;
    /**
       * @inheritdoc
       */
    set(collection: string, key: any, value: any, options?: PreferencesSetOptions): Promise<PreferencesItemImpl<any, any>>;
    /**
       * @inheritdoc
       */
    get(collection: string, key: any): Promise<PreferencesItemImpl<any, any> | undefined>;
    /**
       * @inheritdoc
       */
    deleteAll(collection: string): Promise<PreferencesItem<any, any>[]>;
    /**
       * @inheritdoc
       */
    delete(collection: string, ...keys: any[]): Promise<PreferencesItem<any, any>[]>;
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
    listen(listener: PreferencesItemEventListener, collection?: string): () => void;
}
