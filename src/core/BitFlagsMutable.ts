import {BitFlags} from "./BitFlags.js";
import {clone, Clone} from "./clone.js";

export class BitFlagsMutable extends BitFlags implements Clone<BitFlagsMutable> {

    constructor (value?: number) {
		super(value);
	}

	add(flag: number) : BitFlagsMutable {
        this._value |= flag;
		return this;
	}

	remove(flag: number) : BitFlagsMutable {
        this._value &= ~flag;
		return this;
	}

	toggle(flag: number) : BitFlagsMutable {
        this._value ^= flag;
		return this;
	}

	[clone]() {
		return new BitFlagsMutable(this._value);
	}
}
