export class RequestUrl {
  static create(pathname: string, parts: string[]) {
    return new RequestUrl(pathname, parts);
  }

  private constructor(
    public readonly pathname: string,
    public readonly parts: string[],
  ) {}

  static fromUrl(url: URL): RequestUrl {
    let pathname = url.pathname.trim().replace(/\/$/, "");

    if (pathname.startsWith("/static/")) {
      pathname = `/static/${pathname.slice(8).replace(/\//g, ":")}`;
    }

    const parts = pathname.split("/").filter(Boolean);

    return RequestUrl.create(pathname, parts);
  }
}
