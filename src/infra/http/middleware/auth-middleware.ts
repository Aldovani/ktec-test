import type {
  IJWTService,
  JWTPayload,
} from "@app/contracts/services/jwt-service.js";
import type { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";

export function AuthMiddleware() {
  const jwtService: IJWTService = container.resolve<IJWTService>("JWTService");

  return async function handle(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const decoded = jwtService.decode(token) as JWTPayload;

      (req as any).userId = decoded.userId;
    } catch (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    next();
  };
}
export const authMiddlewareHandler = AuthMiddleware();
