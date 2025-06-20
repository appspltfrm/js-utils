export declare function wasmSupported(version?: number): any;
export declare function wasmStreamingSupported(): boolean;
export declare function wasmSupportedFeatures(): {
    /** Check support JavaScript BigInt to WebAssembly i64 integration (--experimental-wasm-bigint) */
    readonly bigInt: any;
    /** Check support bulk memory operations (--experimental-wasm-bulk-memory) */
    readonly bulk: any;
    /** Check support exception handling (--experimental-wasm-eh) */
    readonly exceptions: any;
    /** Check support 64-bit memory (--experimental-wasm-memory64) */
    readonly memory64: any;
    /** Check support import & export of mutable global (--experimental-wasm-mut-global) */
    readonly mutableGlobal: any;
    /** Check support multi values (--experimental-wasm-mv) */
    readonly multiValue: any;
    /** Check support non-trapping float-to-int conversions (--experimental-wasm-sat-f2i-conversions) */
    readonly saturateConversions: any;
    /** Check support zero and sign extensions (--experimental-wasm-se) */
    readonly signExtensions: any;
    /** Check support tail call optiminations (--experimental-wasm-return-call) */
    readonly tailCall: any;
    /** Check support threads and atomics (--experimental-wasm-threads) */
    readonly threads: any;
    /** Check support SIMD (--experimental-wasm-simd) */
    readonly simd: any;
    /** Check support basic reference types "externref" (--experimental-wasm-reftypes) */
    readonly references: any;
};
