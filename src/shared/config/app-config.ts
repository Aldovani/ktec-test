import { injectable } from "tsyringe";
import { env } from "./env.js";

@injectable()
export class AppConfig {
  readonly application: AppConfig.Application;
  readonly authentication: AppConfig.Authentication;
  readonly database: AppConfig.Database;

  constructor() {
    this.application = {
      port: env.PORT,
      mode: env.NODE_ENV,
    };

    this.authentication = {
      jwtSecret: env.JWT_SECRET,
    };

    this.database = {
      mongoUri: env.MONGO_URI,
    };
  }
}

export namespace AppConfig {
  export type Application = {
    port: number;
    mode: string;
  };

  export type Authentication = {
    jwtSecret: string;
  };

  export type Database = {
    mongoUri: string;
  };
}
