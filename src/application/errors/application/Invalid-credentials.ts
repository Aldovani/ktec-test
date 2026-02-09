import { ErrorCode } from "../error-code.js";
import { ApplicationError } from "./application-error.js";

export class InvalidCredentialsError extends ApplicationError {
  public override statusCode = 401;
  public override code: ErrorCode;

  constructor(message?: any, code?: ErrorCode) {
    super();

    this.code = code ?? ErrorCode.AUTHENTICATION;
    this.message = message ?? "Invalid credentials";
    this.name = "InvalidCredentialsError";
  }
}
