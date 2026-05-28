import "reflect-metadata";
import {Enum, EnumFromJSONValue, EnumStaticName, EnumValueOfValue} from "../../src/core/index.js";
import {property, serializable, subtype, unserialize} from "../../src/json/index.js";

export class AnimalKind extends Enum {
  static readonly cat = new AnimalKind("cat");

  static values() {
    return super.values() as AnimalKind[];
  }

  static valueOf(name: EnumValueOfValue) {
    return super.valueOf(name) as AnimalKind;
  }

  static fromJSON(value: EnumFromJSONValue) {
    return super.fromJSON(value) as AnimalKind;
  }

  private constructor(public readonly name: EnumStaticName<typeof AnimalKind>) {
    super(name);
  }

  toJSON() {
    return this.name;
  }
}

@serializable()
class Animal {
  name!: string;
  @property(AnimalKind)
  kind?: AnimalKind;
}

// Old way
@subtype(Animal, "type", "cat")
class Cat extends Animal {
  meow() {
    return "meow";
  }
}

// New way (should work after fix)
@subtype(Animal)
class Dog extends Animal {
  static readonly jsonTypeName = "Dog";
  bark() {
    return "woof";
  }
}

const catJson = {"@type": "Cat", name: "Kitty", type: "cat", kind: "cat"};
const dogJson = {"@type": "Dog", name: "Buddy"};

const cat = unserialize(catJson, Animal) as Cat;
console.log("Cat is Cat:", cat instanceof Cat);
console.log("Cat sound:", cat.meow());
console.log("Cat kind:", cat.kind);

const dog = unserialize(dogJson, Animal) as Dog;
console.log("Dog is Dog:", dog instanceof Dog);
console.log("Dog sound:", dog.bark());
