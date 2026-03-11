import { Observable } from "rxjs";
import { PreferencesCollectionRef } from "../interfaces.js";
declare module "../interfaces.js" {
    interface PreferencesCollectionRef<Key, Value> {
        observeItems(): Observable<PreferencesItem<Key, Value>[]>;
        observeValues(): Observable<Value[]>;
    }
}
declare module "../PreferencesCollectionRefImpl.js" {
    interface PreferencesCollectionRefImpl<Key, Value> extends PreferencesCollectionRef<Key, Value> {
    }
}
export declare function injectCollectionRxjs(): void;
