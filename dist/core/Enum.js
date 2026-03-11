/**
 * Zaawansowana klasa bazowa dla typów wyliczeniowych w TypeScript.
 * Rozwiązuje problemy ze standardowymi enumami, oferując pełną obiektowość i łatwą serializację.
 *
 * Przykład użycia:
 * ```typescript
 * class UserRole extends Enum {
 *   static readonly ADMIN = new UserRole("ADMIN");
 *   static readonly USER = new UserRole("USER");
 * }
 * ```
 */
export class Enum {
    name;
    /**
     * Zwraca listę wszystkich zarejestrowanych wartości dla danego Enuma.
     */
    static values() {
        return valuesRef(this).slice();
    }
    /**
     * Tworzy instancję Enuma na podstawie wartości JSON (string lub obiekt z polem name).
     */
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
    /**
     * Zwraca instancję Enuma na podstawie nazwy.
     * @throws Błąd, jeśli nazwa nie odpowiada żadnej zdefiniowanej wartości.
     */
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
    /**
     * Porównuje obecną wartość Enuma z inną wartością (string, Enum lub JSON).
     */
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
function addValue(enumClass, value) {
    valuesRef(enumClass).push(value);
}
const enumValuesProp = Symbol("@appspltfrm/js-utils/core/Enum:values");
function valuesRef(enumClass) {
    const cl = enumClass;
    if (!cl[enumValuesProp]) {
        cl[enumValuesProp] = [];
    }
    return cl[enumValuesProp];
}
function jsonTypeName(instanceOrClass) {
    let type;
    if (instanceOrClass instanceof Enum) {
        type = instanceOrClass.constructor;
    }
    else {
        type = instanceOrClass;
    }
    return type.jsonTypeName || type.name;
}
//# sourceMappingURL=Enum.js.map