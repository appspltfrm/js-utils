import { clone } from "./clone.js";
export class HtmlString extends String {
    static jsonTypeName = "HtmlString";
    static fromJSON(json) {
        if (typeof json === "string") {
            return new HtmlString(json);
        }
        else if (typeof json === "object" && json["@type"] === HtmlString.jsonTypeName && typeof json["value"] === "string") {
            return new HtmlString(json["value"]);
        }
        else {
            throw new Error(`Cannot unserialize ${json} to HtmlString`);
        }
    }
    [clone]() {
        return new HtmlString(this);
    }
    toJSON() {
        return { "@type": "HtmlString", value: super.toString() };
    }
    toString() {
        return super.toString();
    }
}
//# sourceMappingURL=HtmlString.js.map