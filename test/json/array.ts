import {serialize, property} from "@co.mmons/js-utils/json";
import {ArraySerializer} from "@co.mmons/js-utils/json/serializers";

class Model {

    @property(String)
    property: string;

    @property(ArraySerializer.ofString)
    array: string[]
}

const model = new Model();
model.array = ["a", "b", "c"];

let serializer = new ArraySerializer(Model);
let array = [new Model(), new Model()];

let arraySerialized = serialize(array, serializer);
console.log(arraySerialized);

let arrayUnserialized = serializer.unserialize(arraySerialized);
console.log(arrayUnserialized);
