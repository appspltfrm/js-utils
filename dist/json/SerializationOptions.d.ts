import { TypeProvider } from "./TypeProvider.js";
/**
 * Configuration options for serialization and unserialization processes.
 */
export interface SerializationOptions {
    /**
       * If true, allows loose type conversions (e.g., string "123" to number).
       */
    notStrict?: boolean;
    /**
       * If true, throws an error when a null or undefined value is encountered
       * where it's not expected.
       */
    disallowUndefinedOrNull?: boolean;
    /**
       * If true, suppresses errors and returns undefined instead of throwing.
       */
    ignoreErrors?: boolean;
    /**
       * Custom type providers to use during the process.
       */
    typeProviders?: TypeProvider[];
    /**
       * Any additional context-specific options.
       */
    [propName: string]: any;
}
