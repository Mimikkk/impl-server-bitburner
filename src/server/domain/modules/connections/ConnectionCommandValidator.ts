export class ConnectionCommandValidator<P> {
  static create<P>(
    validate: (this: ConnectionCommandValidator<P>, params: P) => boolean,
  ): ConnectionCommandValidator<P> {
    return new ConnectionCommandValidator(validate);
  }

  private constructor(
    public readonly validate: (this: ConnectionCommandValidator<P>, params: P) => boolean,
  ) {
    this.validate = validate.bind(this);
  }
}
