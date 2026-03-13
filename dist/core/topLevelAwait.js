const awaits = [];
export function topLevelAwaits(...inputs) {
    for (const input of inputs) {
        topLevelAwait(input);
    }
}
export function topLevelAwait(input) {
    if (!awaits.includes(input)) {
        awaits.push(input);
    }
    let result;
    let error;
    const awaiter = input;
    awaiter.error = () => error;
    awaiter.value = () => result;
    const finish = () => {
        for (let i = 0; i < awaits.length; i++) {
            if (awaits[i] === input) {
                awaits.splice(i, 1);
                break;
            }
        }
    };
    input.then(v => {
        result = v;
        finish();
    }).catch(e => {
        error = e;
        finish();
    });
    return awaiter;
}
export async function waitTopLevelAwait() {
    await Promise.allSettled(awaits);
}
//# sourceMappingURL=topLevelAwait.js.map