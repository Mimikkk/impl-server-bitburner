import { Model } from "../../../../infrastructure/persistence/models/Model.ts";
import { Connection } from "../entities/Connection.ts";

export type ConnectionModel = Model<number, Connection>;
