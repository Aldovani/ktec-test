import type {
  IJWTGeneratorConfig,
  IJWTService,
  JWTPayload,
} from "@app/contracts/services/jwt-service.js";
import type { AppConfig } from "@shared/config/app-config.js";
import jwt from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { minutesToSeconds } from "../../utils/minitues-to-second.js";

@injectable()
export class JWTService implements IJWTService {
  constructor(
    @inject("AppConfig")
    private readonly appConfig: AppConfig,
  ) { }

  sign(payload: JWTPayload, config?: IJWTGeneratorConfig): string {
    const token = jwt.sign(payload, this.appConfig.authentication.jwtSecret, {
      expiresIn: config?.expiresIn || minutesToSeconds(15),
    });

    return token;
  }

  decode(token: string): JWTPayload {
    const decoded = jwt.verify(token, this.appConfig.authentication.jwtSecret);

    return decoded as JWTPayload;
  }
}
