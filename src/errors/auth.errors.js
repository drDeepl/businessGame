export class AuthNullableObtainTokenError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthoriztionError';
  }
}

export class UserNotFound extends Error {
  constructor(message) {
    super(message);
    this.name = 'UserNotFound';
  }
}
