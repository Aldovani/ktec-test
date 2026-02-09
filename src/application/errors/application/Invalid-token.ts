import { ErrorCode } from "../error-code.js";
import { ApplicationError } from "./application-error.js";

export class InvalidRefreshTokenError extends ApplicationError {
  public override statusCode = 401;
  public override code: ErrorCode;

  constructor(message?: any, code?: ErrorCode) {
    super();

    this.code = code ?? ErrorCode.INVALID_REFRESH_TOKEN;
    this.message = message ?? "Invalid refresh token";
    this.name = "InvalidRefreshTokenError";
  }
}
