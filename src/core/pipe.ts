type AnyFunc = (...arg: any) => any;

type LastFnReturnType<F extends Array<AnyFunc>, Else = never> = F extends [...any[], (...arg: any) => infer R] ? R : Else;

type PipeArgs<F extends AnyFunc[], Acc extends AnyFunc[] = []> = F extends [(...args: infer A) => infer B]
  ? [...Acc, (...args: A) => B] : F extends [(...args: infer A) => any, ...infer Tail] ? Tail extends [(arg: infer B) => any, ...any[]] ? PipeArgs<Tail, [...Acc, (...args: A) => B]> : Acc : Acc;

/**
 * Functional pipe utility that chains multiple functions together.
 *
 * It takes an initial value and a series of functions, applying each function
 * to the result of the previous one.
 *
 * @param arg The initial value to pass into the first function.
 * @param firstFn The first function to execute.
 * @param fns Subsequent functions to execute in order.
 * @returns The final result after all functions have been applied.
 *
 * @example
 * ```typescript
 * const add5 = (n: number) => n + 5;
 * const toString = (n: number) => n.toString();
 * const result = pipe(10, add5, toString); // "15"
 * ```
 */
export function pipe<FirstFn extends AnyFunc, F extends AnyFunc[]>(
  arg: Parameters<FirstFn>[0],
  firstFn: FirstFn,
  ...fns: PipeArgs<F> extends F ? F : PipeArgs<F>
): LastFnReturnType<F, ReturnType<FirstFn>> {
  return (fns as AnyFunc[]).reduce((acc, fn) => fn(acc), firstFn(arg));
}
