import { ErrorCode } from "../error-code.js";
import { ApplicationError } from "./application-error.js";

export class ResourceNotFound extends ApplicationError {
  public override statusCode = 404;
  public override code: ErrorCode;

  constructor(message?: any, code?: ErrorCode) {
    super();

    this.code = code ?? ErrorCode.RESOURCE_NOT_FOUND;
    this.message = message ?? "Resource not found";
    this.name = "ResourceNotFoundError";
  }
}
