export class PreferencesItemRefImpl {
    collection;
    key;
    constructor(collection, key) {
        this.collection = collection;
        this.key = key;
    }
    async delete() {
        return (await this.collection.delete(this.key)).length === 1;
    }
    async value() {
        return await this.collection.value(this.key);
    }
    async lastUpdate() {
        return (await this.collection.item(this.key)).lastUpdate;
    }
    set(value, options) {
        return this.collection.set(this.key, value, options);
    }
    update(value) {
        return this.collection.update(this.key, value);
    }
}
//# sourceMappingURL=PreferencesItemRefImpl.js.map