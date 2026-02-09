import { ApplicationError } from "@app/errors/application/application-error.js";
import { ErrorCode } from "@app/errors/error-code.js";
import { HttpError } from "@app/errors/http/http-error.js";
import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

function globalErrorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (error instanceof ZodError) {
    return res.status(400).json({
      code: ErrorCode.VALIDATION,
      message: error.issues.map((issue) => ({
        filed: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  if (error instanceof HttpError) {
    return res.status(error.statusCode).json({
      code: error.code,
      message: error.message,
    });
  }

  if (error instanceof ApplicationError) {
    return res.status(error.statusCode ?? 400).json({
      code: error.code,
      message: error.message,
    });
  }

  // eslint-disable-next-line no-console
  console.error(error);

  return res.status(500).json({
    code: ErrorCode.INTERNAL_SERVER_ERROR,
    message: "Internal server error",
  });

}
export { globalErrorHandler };
