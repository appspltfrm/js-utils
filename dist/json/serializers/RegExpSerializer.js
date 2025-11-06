import { Serializer } from "../Serializer.js";
export class RegExpSerializer extends Serializer {
    serialize(value, options) {
        if (this.isUndefinedOrNull(value)) {
            return this.serializeUndefinedOrNull(value, options);
        }
        else if (value instanceof RegExp) {
            const json = { "@type": "RegExp", pattern: value.source };
            if (value.flags) {
                json.flags = value.flags;
            }
            return json;
        }
        else if (!options || !options.ignoreErrors) {
            throw new Error(`Cannot serialize "${value}" as RegExp`);
        }
    }
    unserialize(value, options) {
        if (value instanceof RegExp) {
            return value;
        }
        else if (this.isUndefinedOrNull(value)) {
            return this.unserializeUndefinedOrNull(value, options);
        }
        else if (typeof value === "object" && typeof value.pattern === "string") {
            return new RegExp(value.pattern, value.flags);
        }
        else if (!options || !options.ignoreErrors) {
            throw new Error(`Cannot unserialize "${value}" to RegExp`);
        }
        else {
            return undefined;
        }
    }
}
(function (RegExpSerializer) {
    RegExpSerializer.instance = new RegExpSerializer();
})(RegExpSerializer || (RegExpSerializer = {}));
//# sourceMappingURL=RegExpSerializer.js.map