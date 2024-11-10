import {serialize} from "@appspltfrm/js-utils/json/serialize.js";
import {property} from "@appspltfrm/js-utils/json/decorators/property.js";
import {ArraySerializer} from "@appspltfrm/js-utils/json/serializers/ArraySerializer.js";

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
