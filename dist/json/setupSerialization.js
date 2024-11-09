import { fromJsonImpl, toJsonImpl } from "./toFromJsonImpl.js";
export function setupSerialization(type) {
    const internalType = type;
    internalType.__jsonSerialization = true;
    if (!type.prototype.hasOwnProperty("toJSON")) {
        internalType.__jsonToJson = true;
        type.prototype.toJSON = function (options) {
            return toJsonImpl.call(this);
        };
    }
    if (!type.hasOwnProperty("fromJSON")) {
        internalType.__jsonFromJson = true;
        internalType.fromJSON = function (json, options) {
            return fromJsonImpl.call(this, json, options);
        };
    }
}
//# sourceMappingURL=setupSerialization.js.map