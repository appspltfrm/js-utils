/**
 * Checks if basic WebAssembly is supported in the current environment.
 * @param version The WebAssembly version to check (defaults to 1).
 */
export declare function wasmSupported(version?: number): any;
/**
 * Checks if `WebAssembly.instantiateStreaming` is supported.
 */
export declare function wasmStreamingSupported(): boolean;
/**
 * Provides a set of getters to check for specific WebAssembly features support.
 *
 * Based on the `wasm-check` library.
 */
export declare function wasmSupportedFeatures(): {
    /** Check support for JavaScript BigInt to WebAssembly i64 integration */
    readonly bigInt: any;
    /** Check support for bulk memory operations */
    readonly bulk: any;
    /** Check support for exception handling */
    readonly exceptions: any;
    /** Check support for 64-bit memory */
    readonly memory64: any;
    /** Check support for import & export of mutable globals */
    readonly mutableGlobal: any;
    /** Check support for multi-values */
    readonly multiValue: any;
    /** Check support for non-trapping float-to-int conversions */
    readonly saturateConversions: any;
    /** Check support for zero and sign extensions */
    readonly signExtensions: any;
    /** Check support for tail call optimizations */
    readonly tailCall: any;
    /** Check support for threads and atomics */
    readonly threads: any;
    /** Check support for SIMD */
    readonly simd: any;
    /** Check support for basic reference types "externref" */
    readonly references: any;
};
