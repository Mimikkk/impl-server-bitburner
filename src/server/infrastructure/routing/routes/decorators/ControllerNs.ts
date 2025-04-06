import { ControllerClass } from "@server/infrastructure/routing/controllers/ControllerTypes.ts";
import { RouteNs } from "./RouteNs.ts";

export namespace ControllerNs {
  const symbol = Symbol("ControllerMetadata");
  export interface Meta {
    [symbol]: Spec;
  }

  export type Options = { name: string; group?: string };

  export type Spec = { name: string; group: string; routes: RouteNs.Spec[] };

  export const controller = (options: Options) => (target: any) => {
    const meta = target as ControllerClass & Meta;
    const prototype = target.prototype;

    const routes = Object
      .getOwnPropertyNames(prototype)
      .map((key) => prototype[key])
      .filter(RouteNs.is)
      .map(RouteNs.meta);

    meta[symbol] = {
      name: options.name,
      group: options.group ?? "/",
      routes,
    };

    list.push(meta);
  };

  export const list: (ControllerClass & Meta)[] = [];
  export const is = (value: any): value is Meta => !!value[symbol];
  export const meta = (value: Meta): Spec => value[symbol];
}
