import { deepClone } from "./deepClone.js";
import { PreferencesItemRefImpl } from "./PreferencesItemRefImpl.js";
export class ContainerEventsManager {
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
                        ref: new PreferencesItemRefImpl(event.ref.collection, deepClone(event.ref.key)),
                        type: event.type,
                        collection: event.collection,
                        key: deepClone(event.key),
                        oldValue: deepClone(event.oldValue),
                        newValue: deepClone(event.newValue)
                    });
                }
                catch (error) {
                    console.log(error);
                }
            }
        }
    }
}
//# sourceMappingURL=ContainerEventsManager.js.map