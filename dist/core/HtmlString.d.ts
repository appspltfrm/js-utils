import { clone, Clone } from "./clone.js";
export declare class HtmlString extends String implements Clone<HtmlString> {
    static readonly jsonTypeName = "HtmlString";
    static fromJSON(json: string | {
        "@type": "HtmlString";
        value: string;
    }): HtmlString;
    [clone](): HtmlString;
    toJSON(): {
        "@type": string;
        value: string;
    };
    toString(): string;
}
