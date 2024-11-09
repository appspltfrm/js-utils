import {clone, Clone} from "./clone.js";

export class BitFlags implements Clone<BitFlags> {

	constructor(value?: number) {
		this._value = value !== undefined && value !== null ? value : 0;
	}

	protected _value: number;

	get value() {
		return this._value;
	}

	has(flag: number) {
		return (this._value & flag) === flag;
	}

	not(flag: number) {
		return this.has(flag) === false;
	}

	add(flag: number) {
		return new BitFlags(this._value | flag);
	}

	remove(flag: number) {
		return new BitFlags(this._value & ~flag);
	}

	toggle(flag: number) {
		return new BitFlags(this._value ^ flag);
	}

	[clone]() {
		return new BitFlags(this._value);
	}
}
