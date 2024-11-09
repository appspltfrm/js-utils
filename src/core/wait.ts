/**
 * Check condition async and re-check every 100ms (or other interval) till it explicitly returns true.
 * If condition throws error, the promise will be rejected.
 */
export function waitTill(condition: () => boolean, interval: number = 100, timeout?: number): Promise<void> {

    return new Promise((resolve, reject) => {

        let intervalId: any;
        let finished = false;

        let test = () => {

            try {

                if (condition() === true) {

                    if (intervalId) {
                        clearInterval(intervalId);
                    }

                    finished = true;
                    resolve();

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
