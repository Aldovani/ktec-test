import "reflect-metadata";
import dotenv from "dotenv";
import "@kernel/inject/index.js";

import { container } from "tsyringe";
import { App } from "./app.js";

dotenv.config();

async function bootstrap() {
  const app = container.resolve(App);
  app.listen();
}

bootstrap();
