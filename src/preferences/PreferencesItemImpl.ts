import {PreferencesCollectionRef, PreferencesItem, PreferencesItemRef} from "./interfaces.js";

export class PreferencesItemImpl<Key, Value> implements PreferencesItem<Key, Value> {

    constructor(collection: PreferencesCollectionRef, key: Key, value: Value, lastUpdate: number) {
        this.ref = collection.itemRef(key);
        this.value = value;
        this.lastUpdate = lastUpdate;
    }

    get key() {
        return this.ref.key;
    }

    readonly ref: PreferencesItemRef;

    readonly value: Value;

    readonly lastUpdate: number;
}
