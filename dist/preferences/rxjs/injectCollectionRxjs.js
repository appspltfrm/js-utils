import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { PreferencesCollectionRefImpl } from "../PreferencesCollectionRefImpl";
import { deepClone } from "../deepClone";
import { PreferencesItemImpl } from "../PreferencesItemImpl";
class CollectionItemsObserver extends Observable {
    collection;
    constructor(collection) {
        super(subscriber => this.onSubscribe(subscriber));
        this.collection = collection;
    }
    unlisten;
    subscribers = [];
    onSubscribe(subscriber) {
        this.collection.items().then(items => {
            subscriber.next(items);
            this.subscribers.push(subscriber);
            if (!this.unlisten) {
                this.unlisten = this.collection.listen(event => this.listener(event));
            }
        });
        return () => {
            const i = this.subscribers.indexOf(subscriber);
            if (i > -1) {
                this.subscribers.splice(i, 1);
            }
            if (this.subscribers.length === 0 && this.unlisten) {
                this.unlisten();
            }
        };
    }
    async listener(event) {
        const items = await this.collection.items();
        for (const subscriber of this.subscribers) {
            subscriber.next(items.slice()
                .map(item => (item && new PreferencesItemImpl(item.ref.collection, deepClone(item.key), deepClone(item.value), item.lastUpdate)) || item));
        }
    }
}
export function injectCollectionRxjs() {
    PreferencesCollectionRefImpl.prototype.observeItems = function () {
        return new CollectionItemsObserver(this);
    };
    PreferencesCollectionRefImpl.prototype.observeValues = function () {
        return new CollectionItemsObserver(this).pipe(map(items => items.map(item => item.value)));
    };
}
//# sourceMappingURL=injectCollectionRxjs.js.map