export interface IdentifierManager<T extends PropertyKey, P = undefined> {
  next(params: P): T;
}
