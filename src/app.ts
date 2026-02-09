import { globalErrorHandler } from "@infra/http/middleware/global-error-handler.js";
import { authRoutes } from "@infra/http/routes/auth-router.js";
import { userRoutes } from "@infra/http/routes/user-router.js";
import type { AppConfig } from "@shared/config/app-config.js";
import cors from "cors";
import express from "express";
import { connect, disconnect } from "mongoose";
import { version } from "node:os";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { inject, injectable } from "tsyringe";

@injectable()
class App {
  public app: express.Application;
  public env: string;
  public port: number;

  constructor(
    @inject("AppConfig")
    private readonly appConfig: AppConfig,
  ) {
    this.app = express();
    this.env = this.appConfig.application.mode;
    this.port = this.appConfig.application.port;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeSwagger();
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.info(`=================================`);
      console.info(`======= ENV: ${this.env} =======`);
      console.info(`🚀 App listening on the port ${this.port}`);
      console.info(`=================================`);
    });
  }

  public async closeDatabaseConnection(): Promise<void> {
    try {
      await disconnect();
      console.log("Disconnected from MongoDB");
    } catch (error) {
      console.error("Error closing database connection:", error);
    }
  }

  public getServer() {
    return this.app;
  }

  private async connectToDatabase() {
    await connect(this.appConfig.database.mongoUri);
  }

  private initializeMiddlewares() {
    this.app.use(cors({ origin: "*" }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes() {
    this.app.use(authRoutes);
    this.app.use(userRoutes);
  }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        openapi: "3.0.0",
        info: {
          title: "KTEC Technical Test - REST API",
          version: "1.0.0",
          description: "API documentation for the KTEC technical test REST API",
        },
      },
      apis: ["swagger.yaml"],
    };

    const specs = swaggerJSDoc(options);
    this.app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeErrorHandling() {
    this.app.use(globalErrorHandler);
  }
}

export { App };
