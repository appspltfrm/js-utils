import {MemoryPreferencesContainer} from "../../src/preferences";

(async () => {

    const container = new MemoryPreferencesContainer();
    const collection = container.collection<string, { id: string, num: number }>("test/collection");

    collection.listen((event) => {
        console.log("event", event.type, event.key, event.newValue, event.oldValue);
    });

    await collection.set("test1", {id: "test1", num: 1});

    for (let item of await collection.items()) {
        console.log("read item", item.key, item.value);

        await item.ref.set({num: 2}, {merge: true});
        console.log("read set value", (await item.ref.value()));

        await item.ref.update({num: 3});
        console.log("read update value", (await item.ref.value()));

        await item.ref.delete();
        console.log("read delete value", (await item.ref.value()));

    }

    await collection.set("test2", {id: "test2", num: 1});
    await collection.set("test3", {id: "test3", num: 1});
    await collection.set("test4", null);

    console.log("values", await collection.values());

})();
