import {Type} from "../core/Type.js";
import {InternalType} from "./InternalType.js";
import {fromJsonImpl, toJsonImpl} from "./toFromJsonImpl.js";

export function setupSerialization(type: Type) {

    const internalType = type as InternalType;
    internalType.__jsonSerialization = true;

    if (!type.prototype.hasOwnProperty("toJSON")) {
        internalType.__jsonToJson = true;
        type.prototype.toJSON = function (options: any) {
            return toJsonImpl.call(this);
        }
    }

    if (!type.hasOwnProperty("fromJSON")) {
        internalType.__jsonFromJson = true;
        internalType.fromJSON = function (json: any, options: any) {
            return fromJsonImpl.call(this, json, options);
        }
    }
}
