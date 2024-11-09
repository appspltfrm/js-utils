import {Type} from "../../core/Type.js";
import {JsonTypeName} from "../JsonTypeName.js";
import {registerGlobalProvider, RegisterGlobalProviderOptions} from "../registerGlobalProvider.js";

export function globalType(options?: RegisterGlobalProviderOptions) {
    return function(classType: Type & JsonTypeName) {
        registerGlobalProvider({name: classType.jsonTypeName, type: classType}, options);
    }
}
