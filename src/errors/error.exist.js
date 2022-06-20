export class AccountNotFound extends Error {
  constructor(name, message) {
    super(message);
    this.name = name;
  }
}
