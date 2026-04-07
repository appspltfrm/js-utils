const awaits: Promise<any>[] = [];

/**
 * Registers multiple promises for global tracking of asynchronous tasks.
 */
export function topLevelAwaits(...inputs: Promise<any>[]) {
  for (const input of inputs) {
    topLevelAwait(input);
  }
}

/**
 * Registers a promise for global tracking and returns an "awaiter" object
 * that can be used to check its current status (value or error) without `await`.
 *
 * This is useful in legacy environments or specific initialization patterns
 * where you want to start a task and wait for it globally later.
 *
 * @param input The promise to track.
 * @returns The original promise augmented with `value()` and `error()` methods.
 */
export function topLevelAwait<T>(input: Promise<T>): TopLevelAwaiter<T> {

  if (!awaits.includes(input)) {
    awaits.push(input);
  }

  let result: T | undefined;
  let error: any;

  const awaiter = input as TopLevelAwaiter<T>;
  awaiter.error = () => error;
  awaiter.value = () => result;

  const finish = () => {
    for (let i = 0; i < awaits.length; i++) {
      if (awaits[i] === input) {
        awaits.splice(i, 1);
        break;
      }
    }
  }

  input.then(v => {
    result = v;
    finish();
  }).catch(e => {
    error = e;
    finish();
  })

  return awaiter;
}

/**
 * Wait for all promises registered via `topLevelAwait` to settle.
 * This is typically used at the entry point of an application to ensure
 * all background initializations are complete.
 */
export async function waitTopLevelAwait() {
  await Promise.allSettled(awaits);
}

/**
 * A promise augmented with status-checking methods.
 */
export type TopLevelAwaiter<T> = Promise<T> & {
  /**
     * Returns the error if the promise was rejected, otherwise undefined.
     */
  error?: () => any,
  /**
     * Returns the resolved value if the promise was fulfilled, otherwise undefined.
     */
  value: () => T | undefined
};
