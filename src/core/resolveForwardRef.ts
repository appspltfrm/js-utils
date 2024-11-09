import {ForwardRefFn} from "./forwardRef.js";

/**
 * Lazily retrieves the reference value from a forwardRef.
 *
 * Acts as the identity function when given a non-forward-ref value.
 *
 * ### Example ([live demo](http://plnkr.co/edit/GU72mJrk1fiodChcmiDR?p=preview))
 */
export function resolveForwardRef(type: any): any {
    if (typeof type === "function" && type.hasOwnProperty("__forward_ref__") && typeof type.__forward_ref__ === "function") {
        return (<ForwardRefFn>type)();
    } else {
        return type;
    }
}
