import {Type} from "./Type.js";

/**
 * An interface that a function passed into {@link forwardRef} has to implement.
 */
export interface ForwardRefFn {
    (): any
}

/**
 * Allows to refer to references which are not yet defined.
 *
 * For instance, `forwardRef` is used when the `token` which we need to refer to for the purposes of
 * DI is declared,
 * but not yet defined. It is also used when the `token` which we use when creating a query is not
 * yet defined.
 *
 * ### Example
 * {@example core/di/ts/forward_ref/forward_ref_spec.ts region='forward_ref'}
 * @experimental
 */
export function forwardRef(forwardRefFn: ForwardRefFn): Type<any> {
    (<any>forwardRefFn).__forward_ref__ = forwardRef;
    (<any>forwardRefFn).toString = function() { return JSON.stringify(this()); };
    return (<Type<any>><any>forwardRefFn);
}
