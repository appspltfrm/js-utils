"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContainerEventsManager = void 0;
const deepClone_js_1 = require("./deepClone.js");
const PreferencesItemRefImpl_js_1 = require("./PreferencesItemRefImpl.js");
class ContainerEventsManager {
    listeners = [];
    addListener(listener, collection) {
        this.listeners.push({ listener, collection });
        return () => {
            for (let i = this.listeners.length - 1; i >= 0; i--) {
                if (this.listeners[i].listener === listener && ((!this.listeners[i].collection && !collection) || (this.listeners[i].collection === collection))) {
                    this.listeners.splice(i, 1);
                }
            }
        };
    }
    fireEvent(event) {
        for (const listener of this.listeners) {
            if (!listener.collection || event.collection === listener.collection) {
                try {
                    listener.listener({
                        ref: new PreferencesItemRefImpl_js_1.PreferencesItemRefImpl(event.ref.collection, (0, deepClone_js_1.deepClone)(event.ref.key)),
                        type: event.type,
                        collection: event.collection,
                        key: (0, deepClone_js_1.deepClone)(event.key),
                        oldValue: (0, deepClone_js_1.deepClone)(event.oldValue),
                        newValue: (0, deepClone_js_1.deepClone)(event.newValue)
                    });
                }
                catch (error) {
                    console.log(error);
                }
            }
        }
    }
}
exports.ContainerEventsManager = ContainerEventsManager;
//# sourceMappingURL=ContainerEventsManager.js.map