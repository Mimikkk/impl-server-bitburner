export type Nil<T> = T | undefined | null;

export type Merge<A, B> = { [K in keyof A | keyof B]: K extends keyof A ? A[K] : K extends keyof B ? B[K] : never };

type KeyByInner<
  T extends Record<K, PropertyKey>[],
  K extends PropertyKey,
  R = {},
> = T extends [] ? R : T extends [
  infer HT extends Record<K, PropertyKey>,
  ...infer TT extends Record<K, PropertyKey>[],
] ? KeyByInner<TT, K, Merge<R, Record<HT[K], HT>>>
: never;

export type KeyBy<
  I extends Record<K, PropertyKey>[],
  K extends PropertyKey,
> = KeyByInner<I, K, {}>;
