import BigNumber from "bignumber.js";
export declare class BNumber extends BigNumber {
    static readonly jsonTypeName = "BNumber";
    toJSON(): any;
    static fromJSON(json: any): BNumber;
}
