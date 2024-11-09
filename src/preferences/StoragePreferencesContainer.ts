import {ContainerEventsManager} from "./ContainerEventsManager.js";
import {deepClone} from "./deepClone.js";
import {
    PreferencesCollectionRef,
    PreferencesContainer,
    PreferencesItem,
    PreferencesItemEvent,
    PreferencesSetOptions
} from "./interfaces.js";
import {merge} from "./merge.js";
import {PreferencesCollectionRefImpl} from "./PreferencesCollectionRefImpl.js";
import {PreferencesItemImpl} from "./PreferencesItemImpl.js";

interface StorageItem {
    value: any;
    lastUpdate?: number;
}

export class StoragePreferencesContainer implements PreferencesContainer {

    constructor(private readonly storage: typeof window.localStorage | typeof window.sessionStorage) {
    }

    protected readonly events: ContainerEventsManager = new ContainerEventsManager();

    protected fireEvent(event: Partial<PreferencesItemEvent<any, any>>) {
        this.events.fireEvent(Object.assign(event, {ref: new PreferencesCollectionRefImpl(this, event.collection).itemRef(event.key)}) as PreferencesItemEvent<any, any>);
    }

    private getStorageItem(storageKey: string) {
        return JSON.parse(this.storage.getItem(storageKey)) as StorageItem;
    }

    private setStorageItem(storageKey: string, item: StorageItem) {
        this.storage.setItem(storageKey, JSON.stringify(item));
    }

    private storageKey(collection: string, key: any) {
        return JSON.stringify([collection, key]);
    }

    private collectionAndKey(storageKey: string): [string, any] {

        if (storageKey.startsWith("[") && storageKey.endsWith("]")) {
            try {
                const collectionAndKey: [string, any] = JSON.parse(storageKey);
                return (Array.isArray(collectionAndKey) && collectionAndKey.length === 2 && typeof collectionAndKey[0] === "string" && collectionAndKey) || null;
            } catch (e) {
                console.warn(e);
            }
        }

        return null;
    }

    private newItem(item: {collection: string, key: any, value: any, lastUpdate: number}) {
        if (item) {
            return new PreferencesItemImpl(this.collection(item.collection), deepClone(item.key), deepClone(item.value), item.lastUpdate);
        }

        return undefined;
    }

    set(collection: string, key: any, value: any, options?: PreferencesSetOptions) {

        const itemKey = this.storageKey(collection, key);

        let item = this.getStorageItem(itemKey);

        if (value === undefined) {
            value = null;
        }

        if (item) {

            item.lastUpdate = Date.now();

            const old = item.value;
            item.value = deepClone(options && options.merge ? merge(options.merge === "deep", item.value, value) : value);

            this.setStorageItem(itemKey, item);

            this.fireEvent({
                collection: collection,
                type: "update",
                key: deepClone(key),
                newValue: deepClone(item.value),
                oldValue: deepClone(old)
            });

        } else {
            item = {value: value, lastUpdate: Date.now()};

            this.setStorageItem(itemKey, item);

            this.fireEvent({
                collection: collection,
                type: "create",
                key: deepClone(key),
                newValue: deepClone(value)
            });
        }

        return Promise.resolve(this.newItem({key, collection, value: item.value, lastUpdate: item.lastUpdate}));
    }

    get(collection: string, key: any) {
        const item = this.getStorageItem(this.storageKey(collection, key));
        return Promise.resolve(this.newItem(item && {collection, key, value: item.value, lastUpdate: item.lastUpdate}));
    }

    delete(collection: string, ...keys: any[]) {

        const deleted: PreferencesItem[] = [];

        KEYS: for (const key of keys) {
            const itemKey = this.storageKey(collection, key);

            for (let i = 0; i < this.storage.length; i++) {
                const storageKey = this.storage.key(i);

                if (itemKey === storageKey) {
                    const item = this.getStorageItem(storageKey);

                    this.storage.removeItem(storageKey);

                    this.fireEvent({
                        collection,
                        type: "delete",
                        key: deepClone(key),
                        oldValue: deepClone(item.value)
                    });

                    deleted.push(this.newItem({collection, key, value: item.value, lastUpdate: item.lastUpdate}));

                    continue KEYS;
                }
            }
        }

        return Promise.resolve(deleted);
    }

    deleteAll(collection: string) {

        const deleted: PreferencesItem[] = [];

        for (let i = 0; i < this.storage.length; i++) {
            const storageKey = this.storage.key(i);
            const collectionAndKey = this.collectionAndKey(storageKey);

            if (collectionAndKey && collectionAndKey[0] === collection) {
                const item = this.getStorageItem(storageKey);

                this.storage.removeItem(storageKey);

                this.fireEvent({
                    collection,
                    type: "delete",
                    key: deepClone(collectionAndKey[1]),
                    oldValue: deepClone(item.value)
                });

                deleted.push(this.newItem({collection, key: collectionAndKey[1], value: item.value, lastUpdate: item.lastUpdate}));
            }
        }

        return Promise.resolve(deleted);
    }

    exists(collection: string, key: any): Promise<boolean> {
        const item = this.getStorageItem(this.storageKey(collection, key));
        return Promise.resolve(!!item);
    }

    items(collection: string, keysToFilter?: any) {

        const items: PreferencesItem[] = [];

        const args = arguments;
        const keys: any[] = arguments.length > 1 && new Array(arguments.length - 1).fill(undefined).map((value, index) => args[index + 1]);

        if (keys) {

            KEYS: for (const key of keys) {
                const itemKey = this.storageKey(collection, key);

                for (let i = 0; i < this.storage.length; i++) {
                    const storageKey = this.storage.key(i);

                    if (itemKey === storageKey) {
                        const item = this.getStorageItem(storageKey);
                        items.push(this.newItem({collection, key, value: item.value, lastUpdate: item.lastUpdate}));
                        continue KEYS;
                    }
                }
            }

        } else if (arguments.length === 1) {

            for (let i = 0; i < this.storage.length; i++) {
                const storageKey = this.storage.key(i);
                const collectionAndKey = this.collectionAndKey(storageKey);

                if (collectionAndKey && collectionAndKey[0] === collection) {
                    const item = this.getStorageItem(storageKey);
                    items.push(this.newItem({collection, key: collectionAndKey[1], value: item.value, lastUpdate: item.lastUpdate}));
                }
            }
        }

        return Promise.resolve(items);
    }

    update<Key = any, Value = any>(collection: string, key: Key, changes: Partial<Value>): Promise<PreferencesItem<Key, Value>> {

        const storageKey = this.storageKey(collection, key);
        const rawItem = this.storage.getItem(storageKey);
        const lastUpdate = Date.now();

        if (rawItem) {

            const oldItem: StorageItem = JSON.parse(rawItem);
            let newValue: Value = oldItem.value;

            if (changes) {

                newValue = Object.assign({}, newValue, changes);

                this.fireEvent({
                    collection: collection,
                    type: "update",
                    key: deepClone(key),
                    newValue: deepClone(newValue),
                    oldValue: (oldItem && deepClone(oldItem.value)) || null
                });

                this.setStorageItem(storageKey, {value: newValue, lastUpdate});
            }

            return Promise.resolve(this.newItem({collection, key, value: newValue, lastUpdate}));

        } else {
            return Promise.reject(new Error("Key not exists"));
        }
    }

    collection<Key, Value>(name: string): PreferencesCollectionRef<Key, Value> {
        return new PreferencesCollectionRefImpl(this, name);
    }

    listen<Key, Value>(listener: (event: PreferencesItemEvent<any, any>) => void, collection?: string): () => void {
        return this.events.addListener(listener, collection);
    }

}
