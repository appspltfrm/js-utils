import {deepClone} from "./deepClone.js";
import {PreferencesItemEvent, PreferencesItemEventListener} from "./interfaces.js";
import {PreferencesItemRefImpl} from "./PreferencesItemRefImpl.js";

export class ContainerEventsManager {

    private listeners: {listener: PreferencesItemEventListener, collection?: string}[] = [];

    addListener(listener: PreferencesItemEventListener, collection: string) {
        this.listeners.push({listener, collection});

        return () => {
            for (let i = this.listeners.length - 1; i >= 0; i--) {
                if (this.listeners[i].listener === listener && ((!this.listeners[i].collection && !collection) || (this.listeners[i].collection === collection))) {
                    this.listeners.splice(i, 1);
                }
            }
        }
    }

    fireEvent(event: PreferencesItemEvent<any, any>) {

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

                } catch (error) {
                    console.log(error);
                }
            }
        }

    }
}
