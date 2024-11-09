import {PreferencesCollectionRef, PreferencesItemRef, PreferencesSetOptions} from "./interfaces.js";

export class PreferencesItemRefImpl<Key, Value> implements PreferencesItemRef<Key, Value> {

    constructor(public readonly collection: PreferencesCollectionRef<Key, Value>, public readonly key: Key) {
    }

    async delete(): Promise<boolean> {
        return (await this.collection.delete(this.key)).length === 1;
    }

    async value(): Promise<Value> {
        return await this.collection.value(this.key);
    }

    async lastUpdate(): Promise<number> {
        return (await this.collection.item(this.key)).lastUpdate;
    }

    set(value: Value, options?: PreferencesSetOptions) {
        return this.collection.set(this.key, value, options);
    }

    update(value: Value) {
        return this.collection.update(this.key, value);
    }

}
