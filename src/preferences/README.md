# Moduł Preferences - Abstrakcja Stanu i Ustawień

Moduł ten ujednolica sposób przechowywania i odczytu ustawień aplikacji, niezależnie od tego, czy dane są zapisywane w pamięci RAM, czy trwale w przeglądarce (`localStorage`).

## Główne interfejsy i klasy

### `PreferencesContainer`
Uniwersalny interfejs do operacji CRUD na kolekcjach danych.

#### Implementacje:
1.  **MemoryPreferencesContainer**: Przechowuje dane w pamięci (ulotne).
2.  **StoragePreferencesContainer**: Wykorzystuje `Web Storage API` do trwałego zapisu danych w przeglądarce.

## Przykład użycia

```typescript
import { StoragePreferencesContainer } from "@appspltfrm/js-utils/preferences";

const container = new StoragePreferencesContainer(window.localStorage);
const userPrefs = container.collection("user_settings");

// Zapisywanie
await userPrefs.set("theme", "dark");

// Odczytywanie
const theme = await userPrefs.get("theme");
console.log(theme); // "dark"
```

## Reaktywność z RxJS

Dzięki modułowi `rxjs`, możesz obserwować zmiany w ustawieniach w sposób deklaratywny. Pozwala to na automatyczne odświeżanie interfejsu użytkownika, gdy wartość w preferencjach ulegnie zmianie.

### Aktywacja reaktywności
Zanim użyjesz metod `observe`, musisz zainicjować rozszerzenie RxJS:

```typescript
import { injectPreferencesRxjs } from "@appspltfrm/js-utils/preferences/rxjs";

injectPreferencesRxjs();
```

### Obserwowanie zmian

```typescript
const theme$ = userPrefs.observeValues();

theme$.subscribe(values => {
    console.log("Aktualne wartości:", values);
});
```

Metody dodawane przez RxJS:
- `observeItems()`: Zwraca strumień wszystkich elementów w kolekcji wraz z kluczami i metadanymi.
- `observeValues()`: Zwraca strumień samych wartości elementów kolekcji.

## Dlaczego warto używać Preferences?
1.  **Typowanie**: Możesz precyzyjnie zdefiniować typy kluczy i wartości.
2.  **Abstrakcja**: Zmiana miejsca przechowywania danych (np. z `localStorage` na bazę danych w chmurze) wymaga jedynie zmiany implementacji kontenera, bez modyfikacji logiki biznesowej.
3.  **Wydarzenia**: Obsługa nasłuchiwania na zmiany w kolekcjach (`listen`).
