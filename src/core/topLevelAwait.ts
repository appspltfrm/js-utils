const awaits: Promise<any>[] = [];

export function topLevelAwaits(...inputs: Promise<any>[]) {
    for (const input of inputs) {
        topLevelAwait(input);
    }
}

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

export async function waitTopLevelAwait() {
    await Promise.allSettled(awaits);
}

export type TopLevelAwaiter<T> = Promise<T> & {error?: () => any, value: () => T | undefined};