import { PreferencesItemRefImpl } from "./PreferencesItemRefImpl.js";
export class PreferencesCollectionRefImpl {
    container;
    name;
    constructor(container, name) {
        this.container = container;
        this.name = name;
    }
    itemRef(key) {
        return new PreferencesItemRefImpl(this, key);
    }
    async items() {
        const args = arguments;
        const keys = arguments.length > 0 ? new Array(arguments.length).fill(undefined).map((value, index) => args[index]) : undefined;
        if (keys) {
            return this.container.items(this.name, ...keys);
        }
        else if (arguments.length === 0) {
            return this.container.items(this.name);
        }
        else {
            return [];
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
    async item(key) {
        const items = await this.container.items(this.name, key);
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
        const keys = arguments.length > 0 ? new Array(arguments.length).fill(undefined).map((value, index) => args[index]) : undefined;
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
//# sourceMappingURL=PreferencesCollectionRefImpl.js.map