"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreferencesCollectionRefImpl = void 0;
const PreferencesItemRefImpl_js_1 = require("./PreferencesItemRefImpl.js");
class PreferencesCollectionRefImpl {
    container;
    name;
    constructor(container, name) {
        this.container = container;
        this.name = name;
    }
    itemRef(key) {
        return new PreferencesItemRefImpl_js_1.PreferencesItemRefImpl(this, key);
    }
    items() {
        const args = arguments;
        const keys = arguments.length > 0 && new Array(arguments.length).fill(undefined).map((value, index) => args[index]);
        if (keys) {
            return this.container.items(this.name, ...keys);
        }
        else if (arguments.length === 0) {
            return this.container.items(this.name);
        }
    }
    delete(...keys) {
        return this.container.delete(this.name, ...keys);
    }
    deleteAll() {
        return this.container.deleteAll(this.name);
    }
    exists(key) {
        return this.container.exists(this.name, key);
    }
    item(key) {
        const items = this.container.items(this.name, key);
        return (items && items[0]) || undefined;
    }
    set(key, value, options) {
        return this.container.set(this.name, key, value, options);
    }
    update(key, value) {
        return this.container.update(this.name, key, value);
    }
    async value(key) {
        const item = await this.container.get(this.name, key);
        return (item && item.value) || null;
    }
    values() {
        const args = arguments;
        const keys = arguments.length > 0 && new Array(arguments.length).fill(undefined).map((value, index) => args[index]);
        return new Promise(async (resolve, reject) => {
            const values = [];
            try {
                let items;
                if (keys) {
                    items = this.container.items(this.name, ...keys);
                }
                else if (args.length === 0) {
                    items = this.container.items(this.name);
                }
                if (items) {
                    for (const item of await items) {
                        values.push(item.value);
                    }
                }
            }
            catch (error) {
                return reject(error);
            }
            return resolve(values);
        });
    }
    listen(listener) {
        return this.container.listen(listener, this.name);
    }
}
exports.PreferencesCollectionRefImpl = PreferencesCollectionRefImpl;
//# sourceMappingURL=PreferencesCollectionRefImpl.js.map