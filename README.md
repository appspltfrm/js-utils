# @appspltfrm/js-utils

Zbiór uniwersalnych narzędzi programistycznych dla TypeScript/JavaScript, zaprojektowany z myślą o projektach zorientowanych obiektowo (OOP), wymagających zaawansowanej serializacji danych oraz elastycznego zarządzania ustawieniami.

## Główne założenia i idea

Pakiet został stworzony, aby rozwiązać powszechne problemy w aplikacjach TypeScript:
1.  **Utrata typów podczas serializacji JSON**: Standardowe `JSON.parse` zwraca surowe obiekty. Moduł `json` pozwala na "odrodzenie" (hydration) pełnych instancji klas.
2.  **Brak wsparcia dla zaawansowanych typów w JS**: Dostarcza brakujące w standardzie mechanizmy, takie jak Enumy klasy premium, flagi bitowe czy precyzyjne operacje na datach.
3.  **Abstrakcja stanu i preferencji**: Ujednolica dostęp do danych niezależnie od miejsca ich przechowywania (pamięć, localStorage).

## Struktura pakietu

Pakiet podzielony jest na trzy moduły logiczne:

### 1. [Core](./src/core/README.md)
Podstawowe typy i utility:
- **Enumy**: Zaawansowane klasy wyliczeniowe z obsługą metadanych.
- **BitFlags**: Operacje na flagach bitowych.
- **DateUtils**: Specjalizowane klasy dat (`LocalDate`, `TimeZoneDate`).
- **Wzorce**: Interfejsy `Clone` i `Equals` oparte na Symbolach.

### 2. [JSON](./src/json/README.md)
System serializacji oparty na dekoratorach:
- **Dekoratory**: `@serializable`, `@property`, `@subtype`.
- **Automatyzacja**: `TsTransformer` automatycznie wykrywa typy pól klasy podczas kompilacji.
- **Polimorfizm**: Obsługa hierarchii klas podczas deserializacji.

### 3. [Preferences](./src/preferences/README.md)
Zarządzanie ustawieniami aplikacji:
- **Kontenery**: `MemoryPreferencesContainer`, `StoragePreferencesContainer`.
- **Reaktywność**: Integracja z RxJS umożliwiająca obserwowanie zmian w danych.

## Dla Programistów i Agentów AI

- **Typowanie**: Pakiet w pełni wykorzystuje TypeScript. Większość typów jest automatycznie rozpoznawana dzięki metadanym.
- **Rozszerzalność**: Można definiować własne serializatory dla niestandardowych typów.
- **Zależności**: Wymaga `reflect-metadata`. Opcjonalnie wspiera `rxjs` oraz `bignumber.js`.

---

Instrukcje instalacji i szczegółowe przykłady znajdują się w plikach README poszczególnych modułów.
