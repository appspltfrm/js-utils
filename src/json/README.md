# Moduł JSON - Zaawansowana Serializacja

Moduł ten rozwiązuje problem utraty typowania podczas konwersji obiektów klas na format JSON i odwrotnie (deserializacji). Pozwala na pełną rekonstrukcję (hydration) instancji klas, włącznie z metodami i hierarchią dziedziczenia.

## Główne Dekoratory

### `@serializable(options?)`
Oznacza klasę jako zdolną do serializacji.
- **Automatyzacja**: Jeśli używasz `TsTransformer`, nie musisz podawać listy pól w opcjach - zostaną one wykryte automatycznie.
- **Opcje**: Pozwalają ręcznie zdefiniować typy skomplikowanych pól (np. tablice obiektów konkretnej klasy).

### `@property(typeOrProvider)`
Definiuje typ danej właściwości, co jest kluczowe dla poprawnej deserializacji zagnieżdżonych struktur.

```typescript
@serializable()
class Address {
    city: string;
}

@serializable()
class User {
    name: string;
    
    @property(Address)
    address: Address;
}
```

### `@subtype(value, property?)`
Obsługuje polimorfizm. Pozwala na automatyczne rozpoznanie, którą klasę potomną należy utworzyć podczas deserializacji.

```typescript
@serializable()
abstract class Animal {
    name: string;
}

@subtype("cat")
class Cat extends Animal {
    meow() { console.log("Meow!"); }
}

@subtype("dog")
class Dog extends Animal {
    bark() { console.log("Woof!"); }
}
```

## TsTransformer (Kompilacja)

Pakiet dostarcza transformator dla kompilatora TypeScript, który:
1. Analizuje definicje klas podczas budowania projektu.
2. Automatycznie wstrzykuje metadane o polach do dekoratorów `@serializable`.
3. Eliminuje konieczność ręcznego opisywania każdej właściwości klasy.

## Przykład użycia

```typescript
import { serialize, unserialize } from "@appspltfrm/js-utils/json";

const user = new User("Jan", new Address("Warszawa"));
const json = serialize(user);

// Deserializacja z przywróceniem klasy User i Address
const restoredUser = unserialize(json, User);
console.log(restoredUser instanceof User); // true
console.log(restoredUser.address instanceof Address); // true
```

## Wymagania
- Skonfigurowany `reflect-metadata`.
- Włączenie `experimentalDecorators` i `emitDecoratorMetadata` w `tsconfig.json`.
