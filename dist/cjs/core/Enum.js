"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Enum = void 0;
class Enum {
    name;
    static values() {
        return valuesRef(this).slice();
    }
    static fromJSON(value, unknownFactory) {
        let name;
        if (typeof value === "string") {
            name = value;
        }
        else if (typeof value === "object" && typeof value?.name === "string") {
            name = value.name;
        }
        if (name) {
            for (const v of valuesRef(this)) {
                if (v.name === name) {
                    return v;
                }
            }
        }
        if (unknownFactory) {
            return unknownFactory(value);
        }
        throw new Error("Invalid value " + JSON.stringify(value) + " for enum " + jsonTypeName(this));
    }
    static valueOf(name, unknownFactory) {
        CHECK_NAME: if (name) {
            if (typeof name === "object" && name) {
                if (name["@type"] === jsonTypeName(this)) {
                    name = name.name;
                }
                else {
                    break CHECK_NAME;
                }
            }
            for (const v of valuesRef(this)) {
                if (v.name === name) {
                    return v;
                }
            }
        }
        if (unknownFactory) {
            return unknownFactory(name);
        }
        throw new Error("Invalid value " + JSON.stringify(name) + " for enum " + this.name);
    }
    constructor(name) {
        this.name = name;
        addValue(this.constructor, this);
    }
    equals(value) {
        if (value === null || value === undefined || typeof value === "function" || typeof value === "number" || typeof value === "boolean") {
            return false;
        }
        if (typeof value === "string") {
            return value === this.name;
        }
        else if ("@type" in value) {
            return value["@type"] === jsonTypeName(this) && value.name === this.name;
        }
        else if (value.constructor === this.constructor) {
            return value.name === this.name;
        }
        return false;
    }
    toJSON() {
        return { "@type": jsonTypeName(this), name: this.name };
    }
}
exports.Enum = Enum;
function addValue(enumClass, value) {
    valuesRef(enumClass).push(value);
}
function valuesRef(enumClass) {
    if (!enumClass["__enumValues"]) {
        enumClass["__enumValues"] = [];
    }
    return enumClass["__enumValues"];
}
function jsonTypeName(instanceOrClass) {
    let type;
    if (instanceOrClass instanceof Enum) {
        type = instanceOrClass.constructor;
    }
    else {
        type = instanceOrClass;
    }
    return type["jsonTypeName"] || type.name;
}
//# sourceMappingURL=Enum.js.map