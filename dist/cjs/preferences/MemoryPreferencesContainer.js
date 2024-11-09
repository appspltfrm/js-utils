"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryPreferencesContainer = void 0;
const fast_equals_1 = require("fast-equals");
const ContainerEventsManager_js_1 = require("./ContainerEventsManager.js");
const deepClone_js_1 = require("./deepClone.js");
const merge_js_1 = require("./merge.js");
const PreferencesCollectionRefImpl_js_1 = require("./PreferencesCollectionRefImpl.js");
const PreferencesItemImpl_js_1 = require("./PreferencesItemImpl.js");
class MemoryPreferencesContainer {
    memory = [];
    events = new ContainerEventsManager_js_1.ContainerEventsManager();
    fireEvent(event) {
        this.events.fireEvent(Object.assign(event, { ref: new PreferencesCollectionRefImpl_js_1.PreferencesCollectionRefImpl(this, event.collection).itemRef(event.key) }));
    }
    newItem(item) {
        if (item) {
            return new PreferencesItemImpl_js_1.PreferencesItemImpl(this.collection(item.collection), (0, deepClone_js_1.deepClone)(item.key), (0, deepClone_js_1.deepClone)(item.value), item.lastUpdate);
        }
        return undefined;
    }
    set(collection, key, value, options) {
        let item = this.memory.find(item => item.collection === collection && (0, fast_equals_1.deepEqual)(item.key, key));
        if (item) {
            const old = item.value;
            item.value = (0, deepClone_js_1.deepClone)(options && options.merge ? (0, merge_js_1.merge)(options.merge === "deep", item.value, value) : value);
            this.fireEvent({
                collection: collection,
                type: "update",
                key: (0, deepClone_js_1.deepClone)(key),
                newValue: (0, deepClone_js_1.deepClone)(item.value),
                oldValue: (0, deepClone_js_1.deepClone)(old)
            });
            return Promise.resolve(this.newItem({ ...item, ...{ lastUpdate: Date.now() } }));
        }
        else {
            this.memory.push(item = { collection: collection, key: (0, deepClone_js_1.deepClone)(key), value: (0, deepClone_js_1.deepClone)(value), lastUpdate: Date.now() });
            this.fireEvent({
                collection: collection,
                type: "create",
                key: (0, deepClone_js_1.deepClone)(key),
                newValue: (0, deepClone_js_1.deepClone)(value)
            });
            return Promise.resolve(this.newItem(item));
        }
    }
    get(collection, key) {
        const item = this.memory.find(item => item.collection === collection && (0, fast_equals_1.deepEqual)(item.key, key));
        return Promise.resolve(this.newItem(item || null));
    }
    deleteAll(collection) {
        const deleted = [];
        for (let i = this.memory.length - 1; i >= 0; i--) {
            if (this.memory[i].collection === collection) {
                for (const item of this.memory.splice(i, 1)) {
                    this.fireEvent({
                        collection,
                        type: "delete",
                        key: (0, deepClone_js_1.deepClone)(item.key),
                        oldValue: (0, deepClone_js_1.deepClone)(item.value)
                    });
                    deleted.push(this.newItem(item));
                }
            }
        }
        return Promise.resolve(deleted);
    }
    delete(collection, ...keys) {
        const deleted = [];
        KEYS: for (const key of keys) {
            for (let i = this.memory.length - 1; i >= 0; i--) {
                if (this.memory[i].collection === collection && (0, fast_equals_1.deepEqual)(this.memory[i].key, key)) {
                    for (const item of this.memory.splice(i, 1)) {
                        this.fireEvent({
                            collection,
                            type: "delete",
                            key: (0, deepClone_js_1.deepClone)(item.key),
                            oldValue: (0, deepClone_js_1.deepClone)(item.value)
                        });
                        deleted.push(this.newItem(item));
                    }
                    continue KEYS;
                }
            }
        }
        return Promise.resolve(deleted);
    }
    exists(collection, key) {
        return Promise.resolve(!!this.memory.find(item => item.collection === collection && (0, fast_equals_1.deepEqual)(item.key, key)));
    }
    items(collection, keysToFilter) {
        const items = [];
        const args = arguments;
        const keys = arguments.length > 1 && new Array(arguments.length - 1).fill(undefined).map((value, index) => args[index + 1]);
        if (keys) {
            KEYS: for (const key of keys) {
                for (const item of this.memory) {
                    if (item.collection === collection && (0, fast_equals_1.deepEqual)(item.key, key)) {
                        items.push(this.newItem(item));
                        continue KEYS;
                    }
                }
            }
        }
        else if (arguments.length === 1) {
            for (const item of this.memory) {
                if (item.collection === collection) {
                    items.push(this.newItem(item));
                }
            }
        }
        return Promise.resolve(items);
    }
    update(collection, key, changes) {
        const item = this.memory.find(item => item.collection === collection && (0, fast_equals_1.deepEqual)(item.key, key));
        if (item) {
            if (changes) {
                const old = item.value;
                item.value = Object.assign({}, item.value, changes);
                this.fireEvent({
                    collection: collection,
                    type: "update",
                    key: (0, deepClone_js_1.deepClone)(key),
                    newValue: (0, deepClone_js_1.deepClone)(item.value),
                    oldValue: (0, deepClone_js_1.deepClone)(old)
                });
            }
            return Promise.resolve(this.newItem({ ...item, ...{ lastUpdate: Date.now() } }));
        }
        else {
            return Promise.reject(new Error("Key not exists"));
        }
    }
    collection(name) {
        return new PreferencesCollectionRefImpl_js_1.PreferencesCollectionRefImpl(this, name);
    }
    listen(listener, collection) {
        return this.events.addListener(listener, collection);
    }
}
exports.MemoryPreferencesContainer = MemoryPreferencesContainer;
//# sourceMappingURL=MemoryPreferencesContainer.js.map