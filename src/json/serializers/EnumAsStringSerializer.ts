import {Enum} from "../../core/Enum.js";
import {SerializationOptions} from "../SerializationOptions.js";
import {Serializer} from "../Serializer.js";

/**
 * Serializes enum as a string. By default native enums are serialized as numbers, @{link Enum} is serialized to types json.
 */
export class EnumAsStringSerializer extends Serializer {

	constructor(enumClass: Enum | any) {
		super();
		this.enumClass = enumClass;
	}

	private readonly enumClass: Enum | any;

	serialize(value: any, options?: SerializationOptions) {

		if (!this.isUndefinedOrNull(value)) {

			if (value instanceof Enum) {
				return value.name;
			}

			return this.enumClass[value];
		} else {
			return value;
		}
	}

	unserialize(value: any, options?: SerializationOptions): any {

		if (value && this.enumClass.fromJSON) {
			return this.enumClass.fromJSON(value);

		} else if (value && typeof value === "string") {
			return this.enumClass[value];

		} else {
			return value;
		}
	}
}
