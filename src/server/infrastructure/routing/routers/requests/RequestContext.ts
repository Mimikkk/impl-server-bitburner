import { RequestUrl } from "@server/infrastructure/routing/routers/requests/RequestUrl.ts";
import { HttpMethod } from "../../../../shared/enums/HttpMethod.ts";

export class RequestContext {
  static create(request: Request, method: HttpMethod, url: RequestUrl) {
    return new RequestContext(request, method, url);
  }

  private constructor(
    public readonly original: Request,
    public readonly method: HttpMethod,
    public readonly url: RequestUrl,
  ) {}

  static fromRequest(request: Request) {
    const url = new URL(request.url);
    const method = request.method as HttpMethod;

    return RequestContext.create(request, method, RequestUrl.fromUrl(url));
  }
}
