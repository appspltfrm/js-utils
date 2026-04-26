import "reflect-metadata";
import {serializable, subtype, unserialize} from "../../src/json/index.js";

@serializable()
class Animal {
  name!: string;
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

const catJson = {"@type": "Cat", name: "Kitty", type: "cat"};
const dogJson = {"@type": "Dog", name: "Buddy"};

const cat = unserialize(catJson, Animal) as Cat;
console.log("Cat is Cat:", cat instanceof Cat);
console.log("Cat sound:", cat.meow());

const dog = unserialize(dogJson, Animal) as Dog;
console.log("Dog is Dog:", dog instanceof Dog);
console.log("Dog sound:", dog.bark());
