export class UnauthorizedException extends Error {
  constructor() {
    super(`User not found with the specified criteria`);
  }
}
