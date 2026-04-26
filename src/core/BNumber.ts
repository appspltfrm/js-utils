import BigNumber from "bignumber.js";

export class BNumber extends BigNumber {
  static readonly jsonTypeName = "BNumber";

  toJSON(): any {
    const value = super.toJSON();
    return {"@type": BNumber.jsonTypeName, value, numberValue: this.toNumber()};
  }

  static fromJSON(json: any) {
    if (typeof json === "string" || typeof json === "number") {
      return new BNumber(json);
    } else if (typeof json === "object" && typeof json.value === "string") {
      return new BNumber(json.value);
    } else {
      throw new Error(`"${json}" is not a valid BNumber`);
    }
  }
}
