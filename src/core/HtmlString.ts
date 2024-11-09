import {clone, Clone} from "./clone.js";

export class HtmlString extends String implements Clone<HtmlString> {

    static readonly jsonTypeName = "HtmlString";

    static fromJSON(json: string | {"@type": "HtmlString", value: string}) {
        if (typeof json === "string") {
            return new HtmlString(json);
        } else if (typeof json === "object" && json["@type"] === HtmlString.jsonTypeName && typeof json["value"] === "string") {
            return new HtmlString(json["value"]);
        } else {
            throw new Error(`Cannot unserialize ${json} to HtmlString`);
        }
    }

    [clone]() {
        return new HtmlString(this);
    }

    toJSON() {
        return {"@type": "HtmlString", value: super.toString()}
    }

    toString(): string {
        return super.toString();
    }
}
