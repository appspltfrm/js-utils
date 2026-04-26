import { clone, Clone } from "./clone.js";
/**
 * A wrapper for strings that contain HTML content.
 *
 * This class serves as a marker that the string is intended to be treated
 * as HTML (e.g., for safe rendering or sanitization purposes). It also
 * supports seamless JSON serialization.
 *
 * @example
 * ```typescript
 * const html = new HtmlString("<div>Hello World</div>");
 * console.log(html.toString()); // "<div>Hello World</div>"
 * ```
 */
export declare class HtmlString extends String implements Clone<HtmlString> {
    static readonly jsonTypeName = "HtmlString";
    /**
       * Unserializes a JSON value into an HtmlString instance.
       * @param json A string or a JSON object with a `value` property.
       */
    static fromJSON(json: string | {
        "@type": "HtmlString";
        value: string;
    }): HtmlString;
    /**
       * Creates a clone of the HtmlString instance.
       */
    [clone](): HtmlString;
    /**
       * Converts the HtmlString to its JSON-serializable representation.
       */
    toJSON(): any;
    /**
       * Returns the string representation of the HTML.
       */
    toString(): string;
}
