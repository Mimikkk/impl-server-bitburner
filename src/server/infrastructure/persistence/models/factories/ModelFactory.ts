import { Model } from "../Model.ts";

export interface ModelFactory<M extends Model> {
  create(value: M["value"]): M;
}
