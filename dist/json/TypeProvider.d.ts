import { Type } from "../core/Type.js";
import { Serializer } from "./Serializer.js";
export interface TypeSerializerProvider {
    type: Type;
    serializer: Serializer;
}
export interface TypeNameProvider {
    type: Type;
    name: string;
}
export interface TypeNameSerializerProvider {
    name: string;
    serializer: Serializer;
}
export interface InternalTypeProvider {
    type?: Type;
    name?: string;
    serializer?: Serializer;
}
export type TypeWithJsonTypeName = (Type & {
    jsonTypeName: string;
});
export type TypeProvider = TypeSerializerProvider | TypeNameProvider | TypeNameSerializerProvider | TypeWithJsonTypeName;
export type TypeProviders = Array<TypeProvider | TypeProvider[] | TypeProviders>;
export type InternalTypeProviders = Array<InternalTypeProvider | InternalTypeProvider[] | TypeProviders>;
