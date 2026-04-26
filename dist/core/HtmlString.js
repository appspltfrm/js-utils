import { clone } from "./clone.js";
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
export class HtmlString extends String {
    static jsonTypeName = "HtmlString";
    /**
       * Unserializes a JSON value into an HtmlString instance.
       * @param json A string or a JSON object with a `value` property.
       */
    static fromJSON(json) {
        if (typeof json === "string") {
            return new HtmlString(json);
        }
        else if (typeof json === "object" && json["@type"] === HtmlString.jsonTypeName && typeof json["value"] === "string") {
            return new HtmlString(json["value"]);
        }
        else {
            throw new Error(`Cannot unserialize ${JSON.stringify(json)} to HtmlString`);
        }
    }
    /**
       * Creates a clone of the HtmlString instance.
       */
    [clone]() {
        return new HtmlString(this.toString());
    }
    /**
       * Converts the HtmlString to its JSON-serializable representation.
       */
    toJSON() {
        return { "@type": "HtmlString", value: this.toString() };
    }
    /**
       * Returns the string representation of the HTML.
       */
    toString() {
        return super.toString();
    }
}
//# sourceMappingURL=HtmlString.js.map