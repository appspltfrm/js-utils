import { ContainerEventsManager } from "./ContainerEventsManager.js";
import { PreferencesCollectionRef, PreferencesContainer, PreferencesItem, PreferencesItemEvent, PreferencesSetOptions } from "./interfaces.js";
import { PreferencesItemImpl } from "./PreferencesItemImpl.js";
export declare class StoragePreferencesContainer implements PreferencesContainer {
    private readonly storage;
    constructor(storage: typeof window.localStorage | typeof window.sessionStorage);
    protected readonly events: ContainerEventsManager;
    protected fireEvent(event: Partial<PreferencesItemEvent<any, any>>): void;
    private getStorageItem;
    private setStorageItem;
    private storageKey;
    private collectionAndKey;
    private newItem;
    set(collection: string, key: any, value: any, options?: PreferencesSetOptions): Promise<PreferencesItemImpl<any, any>>;
    get(collection: string, key: any): Promise<PreferencesItemImpl<any, any>>;
    delete(collection: string, ...keys: any[]): Promise<PreferencesItem<any, any>[]>;
    deleteAll(collection: string): Promise<PreferencesItem<any, any>[]>;
    exists(collection: string, key: any): Promise<boolean>;
    items(collection: string, keysToFilter?: any): Promise<PreferencesItem<any, any>[]>;
    update<Key = any, Value = any>(collection: string, key: Key, changes: Partial<Value>): Promise<PreferencesItem<Key, Value>>;
    collection<Key, Value>(name: string): PreferencesCollectionRef<Key, Value>;
    listen<Key, Value>(listener: (event: PreferencesItemEvent<any, any>) => void, collection?: string): () => void;
}
