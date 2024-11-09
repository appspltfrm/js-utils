import {Type} from "../core/Type.js";
import {SubtypeMatcher} from "./SubtypeMatcher.js";

export interface SubtypeInfo {
    type: Type;
    matcher?: SubtypeMatcher;
    property?: string;
    value?: ((value: any) => boolean) | any;
}
