import BigNumber from "bignumber.js";
/**
 * Implementation of BigNumber with better JSON support.
 * In all cases BNumber should be used instead of BigNumber.
 */
export declare class BNumber extends BigNumber {
    static readonly jsonTypeName = "BNumber";
    toJSON(): any;
    static fromJSON(json: any): BNumber;
}
