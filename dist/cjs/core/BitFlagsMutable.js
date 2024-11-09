"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BitFlagsMutable = void 0;
const BitFlags_js_1 = require("./BitFlags.js");
const clone_js_1 = require("./clone.js");
class BitFlagsMutable extends BitFlags_js_1.BitFlags {
    constructor(value) {
        super(value);
    }
    add(flag) {
        this._value |= flag;
        return this;
    }
    remove(flag) {
        this._value &= ~flag;
        return this;
    }
    toggle(flag) {
        this._value ^= flag;
        return this;
    }
    [clone_js_1.clone]() {
        return new BitFlagsMutable(this._value);
    }
}
exports.BitFlagsMutable = BitFlagsMutable;
//# sourceMappingURL=BitFlagsMutable.js.map