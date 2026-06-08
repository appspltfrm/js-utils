import "reflect-metadata";
import {Enum, EnumFromJSONValue, EnumStaticName, EnumValueOfValue} from "../../src/core/Enum.js";
import {property} from "../../src/json/property.js";
import {serializable} from "../../src/json/serializable.js";
import {serialize} from "../../src/json/serialize.js";
import {subtype} from "../../src/json/subtype.js";
import {unserialize} from "../../src/json/unserialize.js";

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

// Per-property serialization options (notStrict)
@serializable()
class WithOptions {
  @property(Number, {notStrict: true})
  lenient?: number;

  @property(Number)
  strict?: number;
}

function assert(label: string, condition: boolean) {
  console.log(`${condition ? "PASS" : "FAIL"}: ${label}`);
  if (!condition) {
    process.exitCode = 1;
  }
}

// Property-level notStrict coerces "123" -> 123 during unserialize
const lenient = unserialize({lenient: "123", strict: 456}, WithOptions) as WithOptions;
assert("per-property notStrict coerces string to number", lenient.lenient === 123 && typeof lenient.lenient === "number");

// Round-trip keeps the coerced number
assert("per-property notStrict round-trips", serialize(lenient).lenient === 123);

// Control: a property WITHOUT notStrict still rejects a string (options are per-property, not global)
let strictThrew = false;
try {
  unserialize({strict: "789"}, WithOptions);
} catch {
  strictThrew = true;
}
assert("property without notStrict still throws on string", strictThrew);

// Call-level notStrict now propagates to a property that has no own options
const callLevel = unserialize({strict: "789"}, WithOptions, {notStrict: true}) as WithOptions;
assert("call-level notStrict reaches property on unserialize", callLevel.strict === 789);

// Call-level notStrict propagates through toJSON on the serialize path too
const holder = new WithOptions();
(holder as any).strict = "55";
assert("call-level notStrict reaches property on serialize", serialize(holder, {notStrict: true}).strict === 55);
