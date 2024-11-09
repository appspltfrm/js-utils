"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreferencesItemImpl = void 0;
class PreferencesItemImpl {
    constructor(collection, key, value, lastUpdate) {
        this.ref = collection.itemRef(key);
        this.value = value;
        this.lastUpdate = lastUpdate;
    }
    get key() {
        return this.ref.key;
    }
    ref;
    value;
    lastUpdate;
}
exports.PreferencesItemImpl = PreferencesItemImpl;
//# sourceMappingURL=PreferencesItemImpl.js.map