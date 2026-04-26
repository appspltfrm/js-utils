import { Observable } from "rxjs";
import { PreferencesCollectionRef } from "../interfaces.js";
declare module "../interfaces.js" {
    /**
       * Augmented interface for PreferencesCollectionRef to include RxJS methods.
       */
    interface PreferencesCollectionRef<Key, Value> {
        /**
             * Returns an observable of all items in the collection, updating on any change.
             */
        observeItems(): Observable<PreferencesItem<Key, Value>[]>;
        /**
             * Returns an observable of all values in the collection, updating on any change.
             */
        observeValues(): Observable<Value[]>;
    }
}
declare module "../PreferencesCollectionRefImpl.js" {
    interface PreferencesCollectionRefImpl<Key, Value> extends PreferencesCollectionRef<Key, Value> {
    }
}
/**
 * Injects RxJS reactive methods (`observeItems`, `observeValues`) into the
 * `PreferencesCollectionRef` class.
 *
 * This must be called before using any reactive methods on preference collections.
 *
 * @example
 * ```typescript
 * injectCollectionRxjs();
 * const theme$ = userPrefs.observeValues();
 * theme$.subscribe(values => console.log(values));
 * ```
 */
export declare function injectCollectionRxjs(): void;
