import { BitFlags } from "./BitFlags.js";
import { clone } from "./clone.js";
export class BitFlagsMutable extends BitFlags {
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
    [clone]() {
        return new BitFlagsMutable(this._value);
    }
}
//# sourceMappingURL=BitFlagsMutable.js.map