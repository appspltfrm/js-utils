(async () => {

    if (true) {

        for (const file of [
            // "test-subtype",
            // "test-type",
            // "test-array",
            "test-unknown"
            // "test-basic"
            // "test-transformer"
            // "test-enum"
        ]) {
            console.log("---", file, "---");
            const test = await import(`./${file}`);
            const result = test.test();

            if (result === true) {
                console.log("\t", "OK");
            } else {
                console.warn("\t", result);
            }
        }
    }
})();
