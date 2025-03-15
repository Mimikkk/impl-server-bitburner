import { ParameterType } from "@server/infrastructure/routing/routers/routes/RouteUrl.ts";

export class RouteRequestParameterParser {
  static parse(type: ParameterType, value: string): any {
    if (type === "number") {
      return +value;
    }

    return value;
  }
}
