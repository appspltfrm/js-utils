import { fromJsonImpl, toJsonImpl } from "./_toFromJsonImpl.js";
export function _setupSerialization(type) {
    const internalType = type;
    internalType.__jsonSerialization = true;
    if (!type.prototype.hasOwnProperty("toJSON")) {
        internalType.__jsonToJson = true;
        type.prototype.toJSON = function (options) {
            return toJsonImpl.call(this, options);
        };
    }
    if (!type.hasOwnProperty("fromJSON")) {
        internalType.__jsonFromJson = true;
        internalType.fromJSON = function (json, options) {
            return fromJsonImpl.call(this, json, options);
        };
    }
}
//# sourceMappingURL=_setupSerialization.js.map