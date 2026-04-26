import BigNumber from "bignumber.js";
export class BNumber extends BigNumber {
    static jsonTypeName = "BNumber";
    toJSON() {
        const value = super.toJSON();
        return { "@type": BNumber.jsonTypeName, value, numberValue: this.toNumber() };
    }
    static fromJSON(json) {
        if (typeof json === "string" || typeof json === "number") {
            return new BNumber(json);
        }
        else if (typeof json === "object" && typeof json.value === "string") {
            return new BNumber(json.value);
        }
        else {
            throw new Error(`"${json}" is not a valid BNumber`);
        }
    }
}
//# sourceMappingURL=BNumber.js.map