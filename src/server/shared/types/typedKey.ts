export type TypeKey<Item, Type> = {
  [K in keyof Item]: Item[K] extends Type ? K : never;
}[keyof Item];
