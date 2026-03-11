import { __decorate } from "tslib";
import { serializable } from "../../src/json/decorators/serializable.js";
import BigNumber from "bignumber.js";
import { LocalDate } from "../../src/core/LocalDate.js";
import { serialize } from "../../src/json/serialize.js";
import { unserialize } from "../../src/json/unserialize.js";
import { registerGlobalProvider } from "../../src/json/registerGlobalProvider.js";
import { Serializer } from "../../src/json/Serializer.js";
// Rejestrujemy prosty serializer dla BigNumber, aby testy mogły przejść
class BigNumberSerializer extends Serializer {
    serialize(value) {
        return value ? value.toString() : value;
    }
    unserialize(json) {
        return json ? new BigNumber(json) : json;
    }
}
registerGlobalProvider({
    name: "BigNumber",
    serializer: new BigNumberSerializer()
});
let BasicTest = class BasicTest {
    prop1 = "hello";
    prop2 = 42;
    prop3 = true;
};
BasicTest = __decorate([
    serializable()
], BasicTest);
let InternalClassTest = class InternalClassTest {
    date = new LocalDate(2023, 0, 1);
};
InternalClassTest = __decorate([
    serializable()
], InternalClassTest);
let ExternalClassTest = class ExternalClassTest {
    amount = new BigNumber("123.45");
};
ExternalClassTest = __decorate([
    serializable()
], ExternalClassTest);
let GenericArrayTest = class GenericArrayTest {
    dates = [new LocalDate(2023, 0, 1)];
    amounts = [new BigNumber("10.5")];
};
GenericArrayTest = __decorate([
    serializable()
], GenericArrayTest);
let GenericSetMapTest = class GenericSetMapTest {
    dateSet = new Set([new LocalDate(2023, 0, 1)]);
    amountMap = new Map([["key", new BigNumber("20.5")]]);
};
GenericSetMapTest = __decorate([
    serializable()
], GenericSetMapTest);
let MultipleSameTypeTest = class MultipleSameTypeTest {
    date1 = new LocalDate(2023, 0, 1);
    date2 = new LocalDate(2023, 11, 31);
    amount = new BigNumber("100");
};
MultipleSameTypeTest = __decorate([
    serializable()
], MultipleSameTypeTest);
let MixedTest = class MixedTest {
    auto = new LocalDate(2023, 5, 15);
    manual = "manual-value";
};
MixedTest = __decorate([
    serializable({
        properties: {
            manual: {}
        }
    })
], MixedTest);
function runTests() {
    console.log("=== Rozpoczynanie testów TsTransformera i Serializacji ===\n");
    const tests = [
        { name: "Podstawowe typy", instance: new BasicTest() },
        { name: "Klasa wewnętrzna (LocalDate)", instance: new InternalClassTest() },
        { name: "Klasa zewnętrzna (BigNumber)", instance: new ExternalClassTest() },
        { name: "Tablice generyczne", instance: new GenericArrayTest() },
        { name: "Zbiory i Mapy", instance: new GenericSetMapTest() },
        { name: "Wiele pól tego samego typu", instance: new MultipleSameTypeTest() },
        { name: "Mieszane metadane (ręczne + auto)", instance: new MixedTest() }
    ];
    let successCount = 0;
    for (const test of tests) {
        try {
            console.log(`Test: ${test.name}`);
            const json = serialize(test.instance);
            console.log("JSON:", JSON.stringify(json, null, 2));
            const restored = unserialize(json, test.instance.constructor);
            // Weryfikacja typu klasy
            if (!(restored instanceof test.instance.constructor)) {
                throw new Error(`Przywrócony obiekt nie jest instancją ${test.instance.constructor.name}`);
            }
            // Prosta weryfikacja głęboka (dla testów wystarczy)
            const restoredJson = serialize(restored);
            if (JSON.stringify(json) !== JSON.stringify(restoredJson)) {
                throw new Error("JSON po ponownej serializacji różni się od pierwotnego");
            }
            console.log("Result: SUCCESS\n");
            successCount++;
        }
        catch (e) {
            console.error(`Result: FAILED`);
            console.error(`Error: ${e.message}\n`);
        }
    }
    console.log(`=== Podsumowanie: ${successCount}/${tests.length} testów zakończonych sukcesem ===`);
    if (successCount !== tests.length) {
        process.exit(1);
    }
}
runTests();
//# sourceMappingURL=transformer-test.js.map