export class ValidateError extends Error {
  constructor(name, message) {
    super(message);
    this.name = name;
  }
}
