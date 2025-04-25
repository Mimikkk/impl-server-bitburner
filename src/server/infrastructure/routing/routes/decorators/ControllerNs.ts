import { ControllerClass } from "@server/infrastructure/routing/controllers/ControllerTypes.ts";
import { RouteNs } from "./RouteNs.ts";

export namespace ControllerNs {
  const symbol = Symbol("ControllerMeta");
  export interface Meta {
    [symbol]: Spec;
  }

  export type Options = { name: string; group?: string };

  export type Spec = { name: string; group: string; routes: RouteNs.Spec[]; self: Meta };

  export const controller = (options: Options) => (target: any) => {
    const meta = target as ControllerClass & Meta;
    const prototype = target.prototype;

    const routes = Object
      .getOwnPropertyNames(prototype)
      .map((key) => prototype[key])
      .filter(RouteNs.is)
      .map(RouteNs.meta);

    const group = options.group ?? "";

    for (const route of routes) {
      route.path = route.path.startsWith("/") ? route.path : route.path ? `/${group}/${route.path}` : `/${group}`;
    }

    meta[symbol] = {
      name: options.name,
      group,
      routes,
      self: target,
    };

    list.push(meta);
  };

  export const list: (ControllerClass & Meta)[] = [];
  export const is = (value: any): value is Meta => Object.hasOwn(value, symbol);
  export const meta = (value: Meta): Spec => value[symbol];
}
