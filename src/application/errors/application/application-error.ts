import type { ErrorCode } from "../error-code.js";

export abstract class ApplicationError extends Error {
  public statusCode?: number;
  public abstract code: ErrorCode;
}
