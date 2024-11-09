"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HtmlString = void 0;
const clone_js_1 = require("./clone.js");
class HtmlString extends String {
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
    [clone_js_1.clone]() {
        return new HtmlString(this);
    }
    toJSON() {
        return { "@type": "HtmlString", value: super.toString() };
    }
    toString() {
        return super.toString();
    }
}
exports.HtmlString = HtmlString;
//# sourceMappingURL=HtmlString.js.map