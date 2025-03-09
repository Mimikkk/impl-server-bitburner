export class RequestUrl {
  static create(pathname: string, parts: string[]) {
    return new RequestUrl(pathname, parts);
  }

  private constructor(
    public readonly pathname: string,
    public readonly parts: string[],
  ) {}

  static fromUrl(url: URL): RequestUrl {
    const pathname = url.pathname.trim().replace(/\/$/, "");
    const parts = pathname.split("/").filter(Boolean);

    return RequestUrl.create(pathname, parts);
  }
}
