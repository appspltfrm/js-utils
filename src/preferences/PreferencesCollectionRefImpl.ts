import {PreferencesCollectionRef, PreferencesContainer, PreferencesItem, PreferencesItemEventListener, PreferencesSetOptions} from "./interfaces.js";
import {PreferencesItemRefImpl} from "./PreferencesItemRefImpl.js";

export class PreferencesCollectionRefImpl<Key, Value> implements PreferencesCollectionRef<Key, Value> {

    constructor(public readonly container: PreferencesContainer, public readonly name: string) {
    }

    itemRef(key: Key) {
        return new PreferencesItemRefImpl(this, key);
    }

    items() {

        const args = arguments;
        const keys: Key[] = arguments.length > 0 && new Array(arguments.length).fill(undefined).map((value, index) => args[index]);

        if (keys) {
            return this.container.items<Key, Value>(this.name, ...keys);
        } else if (arguments.length === 0) {
            return this.container.items<Key, Value>(this.name);
        }
    }

    delete(...keys: Key[]): Promise<PreferencesItem[]> {
        return this.container.delete(this.name, ...keys);
    }

    deleteAll(): Promise<PreferencesItem[]> {
        return this.container.deleteAll(this.name);
    }

    exists(key: Key): Promise<boolean> {
        return this.container.exists(this.name, key);
    }

    item(key: Key) {
        const items = this.container.items(this.name, key);
        return (items && items[0]) || undefined;
    }

    set(key: Key, value: Value | Partial<Value>, options?: PreferencesSetOptions) {
        return this.container.set(this.name, key, value, options);
    }

    update(key: Key, value: Partial<Value>) {
        return this.container.update(this.name, key, value);
    }

    async value(key: Key) {
        const item = await this.container.get(this.name, key);
        return (item && item.value) || null;
    }

    values(): Promise<Value[]> {

        const args = arguments;
        const keys: Key[] = arguments.length > 0 && new Array(arguments.length).fill(undefined).map((value, index) => args[index]);

        return new Promise<Value[]>(async (resolve, reject) => {

            const values: Value[] = [];

            try {
                let items: Promise<PreferencesItem<Key, Value>[]>;
                if (keys) {
                    items = this.container.items<Key, Value>(this.name, ...keys);
                } else if (args.length === 0) {
                    items = this.container.items<Key, Value>(this.name);
                }

                if (items) {
                    for (const item of await items) {
                        values.push(item.value);
                    }
                }

            } catch (error) {
                return reject(error);
            }

            return resolve(values);
        });
    }

    listen(listener: PreferencesItemEventListener) {
        return this.container.listen(listener, this.name);
    }

}
