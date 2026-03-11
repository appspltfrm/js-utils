# Moduł Core

Moduł dostarcza podstawowe klasy i narzędzia ułatwiające codzienną pracę z TypeScriptem w paradygmacie programowania obiektowego.

## Główne elementy

### 1. Enum
Zaawansowana klasa bazowa dla typów wyliczeniowych. W przeciwieństwie do natywnych enumów TS, te są pełnoprawnymi klasami, które mogą być serializowane do JSON jako obiekty z zachowaniem typu.

```typescript
class Status extends Enum {
    static readonly ACTIVE = new Status("ACTIVE");
    static readonly INACTIVE = new Status("INACTIVE");
}

const s = Status.valueOf("ACTIVE");
console.log(s.equals(Status.ACTIVE)); // true
```

### 2. BitFlags
Zarządzanie flagami bitowymi w sposób czytelny i bezpieczny.

```typescript
const permissions = new BitFlags(0);
const updated = permissions.add(1).add(2);
console.log(updated.has(1)); // true
```

### 3. Date Utils
Zbiór klas rozwiązujących problemy z operacjami na datach i strefach czasowych:
- `LocalDate`: Data bez komponentu czasu.
- `NoTimeDate`: Data, w której czas jest zawsze zerowany.
- `TimeZoneDate`: Data z przypisaną strefą czasową.

### 4. Wzorce: Clone i Equals
Zestaw symboli i interfejsów do implementacji standardowych zachowań obiektów.

```typescript
import { clone, Clone, equals, Equals } from "@appspltfrm/js-utils/core";

class User implements Clone<User>, Equals {
    constructor(public name: string) {}

    [clone]() {
        return new User(this.name);
    }

    [equals](other: any) {
        return other instanceof User && other.name === this.name;
    }
}
```

### 5. Dekoratory
- `@final`: Uniemożliwia zmianę wartości pola po jego zainicjalizowaniu.
- `@Enumerable`: Pozwala kontrolować widoczność pól w pętlach i serializacji.
