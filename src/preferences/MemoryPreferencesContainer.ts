import {deepEqual} from "fast-equals";
import {ContainerEventsManager} from "./ContainerEventsManager.js";
import {deepClone} from "./deepClone.js";
import {
    PreferencesCollectionRef,
    PreferencesContainer,
    PreferencesItem,
    PreferencesItemEvent,
    PreferencesItemEventListener,
    PreferencesSetOptions
} from "./interfaces.js";
import {merge} from "./merge.js";
import {PreferencesCollectionRefImpl} from "./PreferencesCollectionRefImpl.js";
import {PreferencesItemImpl} from "./PreferencesItemImpl.js";

export interface MemoryPreferencesContainerItem {
    key: any;
    value: any;
    collection: string;
    lastUpdate: number;
}

export class MemoryPreferencesContainer implements PreferencesContainer {

    protected readonly memory: MemoryPreferencesContainerItem[] = [];

    protected readonly events: ContainerEventsManager = new ContainerEventsManager();

    protected fireEvent(event: Partial<PreferencesItemEvent<any, any>>) {
        this.events.fireEvent(Object.assign(event, {ref: new PreferencesCollectionRefImpl(this, event.collection).itemRef(event.key)}) as PreferencesItemEvent<any, any>);
    }

    private newItem(item: MemoryPreferencesContainerItem) {
        if (item) {
            return new PreferencesItemImpl(this.collection(item.collection), deepClone(item.key), deepClone(item.value), item.lastUpdate);
        }

        return undefined;
    }

    set(collection: string, key: any, value: any, options?: PreferencesSetOptions) {

        let item = this.memory.find(item => item.collection === collection && deepEqual(item.key, key));

        if (item) {

            const old = item.value;

            item.value = deepClone(options && options.merge ? merge(options.merge === "deep", item.value, value) : value);

            this.fireEvent({
                collection: collection,
                type: "update",
                key: deepClone(key),
                newValue: deepClone(item.value),
                oldValue: deepClone(old)
            });

            return Promise.resolve(this.newItem({...item, ...{lastUpdate: Date.now()}}));

        } else {

            this.memory.push(item = {collection: collection, key: deepClone(key), value: deepClone(value), lastUpdate: Date.now()});

            this.fireEvent({
                collection: collection,
                type: "create",
                key: deepClone(key),
                newValue: deepClone(value)
            });

            return Promise.resolve(this.newItem(item));
        }
    }

    get(collection: string, key: any) {
        const item = this.memory.find(item => item.collection === collection && deepEqual(item.key, key));
        return Promise.resolve(this.newItem(item || null));
    }

    deleteAll(collection: string) {

        const deleted: PreferencesItem[] = [];

        for (let i = this.memory.length - 1; i >= 0; i--) {

            if (this.memory[i].collection === collection) {

                for (const item of this.memory.splice(i, 1)) {

                    this.fireEvent({
                        collection,
                        type: "delete",
                        key: deepClone(item.key),
                        oldValue: deepClone(item.value)
                    });

                    deleted.push(this.newItem(item));
                }
            }
        }

        return Promise.resolve(deleted);
    }

    delete(collection: string, ...keys: any[]) {

        const deleted: PreferencesItem[] = [];

        KEYS: for (const key of keys) {

            for (let i = this.memory.length - 1; i >= 0; i--) {

                if (this.memory[i].collection === collection && deepEqual(this.memory[i].key, key)) {

                    for (const item of this.memory.splice(i, 1)) {

                        this.fireEvent({
                            collection,
                            type: "delete",
                            key: deepClone(item.key),
                            oldValue: deepClone(item.value)
                        });

                        deleted.push(this.newItem(item));
                    }

                    continue KEYS;
                }
            }
        }

        return Promise.resolve(deleted);
    }

    exists(collection: string, key: any): Promise<boolean> {
        return Promise.resolve(!!this.memory.find(item => item.collection === collection && deepEqual(item.key, key)));
    }

    items(collection: string, keysToFilter?: any) {

        const items: PreferencesItem[] = [];

        const args = arguments;
        const keys: any[] = arguments.length > 1 && new Array(arguments.length - 1).fill(undefined).map((value, index) => args[index + 1]);

        if (keys) {

            KEYS: for (const key of keys) {

                for (const item of this.memory) {

                    if (item.collection === collection && deepEqual(item.key, key)) {
                        items.push(this.newItem(item));
                        continue KEYS;
                    }
                }
            }

        } else if (arguments.length === 1) {

            for (const item of this.memory) {
                if (item.collection === collection) {
                    items.push(this.newItem(item));
                }
            }
        }

        return Promise.resolve(items);
    }

    update<Key = any, Value = any>(collection: string, key: Key, changes: Partial<Value>): Promise<PreferencesItem<Key, Value>> {

        const item = this.memory.find(item => item.collection === collection && deepEqual(item.key, key));

        if (item) {

            if (changes) {
                const old = item.value;

                item.value = Object.assign({}, item.value, changes);

                this.fireEvent({
                    collection: collection,
                    type: "update",
                    key: deepClone(key),
                    newValue: deepClone(item.value),
                    oldValue: deepClone(old)
                });
            }

            return Promise.resolve(this.newItem({...item, ...{lastUpdate: Date.now()}}));

        } else {
            return Promise.reject(new Error("Key not exists"));
        }
    }

    collection<Key, Value>(name: string): PreferencesCollectionRef<Key, Value> {
        return new PreferencesCollectionRefImpl(this, name);
    }

    listen<Key, Value>(listener: PreferencesItemEventListener, collection?: string): () => void {
        return this.events.addListener(listener, collection);
    }
}