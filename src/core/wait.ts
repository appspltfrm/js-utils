/**
 * Check condition async and re-check every 100ms (or other interval) till it return truly value (!!).
 * If condition throws error, the promise will be rejected.
 */
export function waitTill<O>(condition: () => O, interval: number = 100, timeout?: number): Promise<O> {

    return new Promise((resolve, reject) => {

        let intervalId: any;
        let finished = false;

        let test = () => {

            try {
                const result = condition();
                if (!!result) {

                    if (intervalId) {
                        clearInterval(intervalId);
                    }

                    finished = true;
                    resolve(result);

                    return true;
                }

            } catch (error) {

                if (intervalId) {
                    clearInterval(intervalId);
                }

                finished = true;
                reject(error);
            }

            return false;
        };

        if (!test()) {
            intervalId = setInterval(test, interval === undefined || interval === null || interval < 0 ? 100 : interval);

            if (timeout > 0) {
                setTimeout(() => {

                    if (!finished) {

                        if (intervalId) {
                            clearInterval(intervalId);
                        }

                        reject(new Error("Timeout of waitTill"));
                    }
                }, timeout);
            }
        }
    });
}
