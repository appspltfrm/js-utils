import { ContainerEventsManager } from "./ContainerEventsManager.js";
import { PreferencesCollectionRef, PreferencesContainer, PreferencesItem, PreferencesItemEvent, PreferencesItemEventListener, PreferencesSetOptions } from "./interfaces.js";
import { PreferencesItemImpl } from "./PreferencesItemImpl.js";
export interface MemoryPreferencesContainerItem {
    key: any;
    value: any;
    collection: string;
    lastUpdate: number;
}
export declare class MemoryPreferencesContainer implements PreferencesContainer {
    protected readonly memory: MemoryPreferencesContainerItem[];
    protected readonly events: ContainerEventsManager;
    protected fireEvent(event: Partial<PreferencesItemEvent<any, any>>): void;
    private newItem;
    set(collection: string, key: any, value: any, options?: PreferencesSetOptions): Promise<PreferencesItemImpl<any, any>>;
    get(collection: string, key: any): Promise<PreferencesItemImpl<any, any>>;
    deleteAll(collection: string): Promise<PreferencesItem<any, any>[]>;
    delete(collection: string, ...keys: any[]): Promise<PreferencesItem<any, any>[]>;
    exists(collection: string, key: any): Promise<boolean>;
    items(collection: string, keysToFilter?: any): Promise<PreferencesItem<any, any>[]>;
    update<Key = any, Value = any>(collection: string, key: Key, changes: Partial<Value>): Promise<PreferencesItem<Key, Value>>;
    collection<Key, Value>(name: string): PreferencesCollectionRef<Key, Value>;
    listen<Key, Value>(listener: PreferencesItemEventListener, collection?: string): () => void;
}
