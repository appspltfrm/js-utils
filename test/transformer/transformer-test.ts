import {serializable} from "../../src/json/decorators/serializable.js";
import BigNumber from "bignumber.js";
import {LocalDate} from "../../src/core/LocalDate.js";
import {serialize} from "../../src/json/serialize.js";
import {unserialize} from "../../src/json/unserialize.js";
import {registerGlobalProvider} from "../../src/json/registerGlobalProvider.js";
import {Serializer} from "../../src/json/Serializer.js";

// Rejestrujemy prosty serializer dla BigNumber, aby testy mogły przejść
class BigNumberSerializer extends Serializer<BigNumber> {
    serialize(value: BigNumber): any {
        return value ? value.toString() : value;
    }
    unserialize(json: any): BigNumber {
        return json ? new BigNumber(json) : json;
    }
}

registerGlobalProvider({
    name: "BigNumber",
    serializer: new BigNumberSerializer()
});

@serializable()
class BasicTest {
    prop1: string = "hello";
    prop2: number = 42;
    prop3: boolean = true;
}

@serializable()
class InternalClassTest {
    date: LocalDate = new LocalDate(2023, 0, 1);
}

@serializable()
class ExternalClassTest {
    amount: BigNumber = new BigNumber("123.45");
}

@serializable()
class GenericArrayTest {
    dates: LocalDate[] = [new LocalDate(2023, 0, 1)];
    amounts: Array<BigNumber> = [new BigNumber("10.5")];
}

@serializable()
class GenericSetMapTest {
    dateSet: Set<LocalDate> = new Set([new LocalDate(2023, 0, 1)]);
    amountMap: Map<string, BigNumber> = new Map([["key", new BigNumber("20.5")]]);
}

@serializable()
class MultipleSameTypeTest {
    date1: LocalDate = new LocalDate(2023, 0, 1);
    date2: LocalDate = new LocalDate(2023, 11, 31);
    amount: BigNumber = new BigNumber("100");
}

@serializable({
    properties: {
        manual: {}
    }
})
class MixedTest {
    auto: LocalDate = new LocalDate(2023, 5, 15);
    manual: string = "manual-value";
}

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
            
            const restored = unserialize(json, test.instance.constructor as any);
            
            // Weryfikacja typu klasy
            if (!(restored instanceof (test.instance.constructor as any))) {
                throw new Error(`Przywrócony obiekt nie jest instancją ${test.instance.constructor.name}`);
            }

            // Prosta weryfikacja głęboka (dla testów wystarczy)
            const restoredJson = serialize(restored);
            if (JSON.stringify(json) !== JSON.stringify(restoredJson)) {
                throw new Error("JSON po ponownej serializacji różni się od pierwotnego");
            }

            console.log("Result: SUCCESS\n");
            successCount++;
        } catch (e: any) {
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
