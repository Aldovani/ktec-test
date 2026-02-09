import { container } from "tsyringe";

import type { IUserRepository } from "@app/contracts/repositories/user-repository.js";
import type { IEncryptionService } from "@app/contracts/services/encryption-service.js";
import type { IJWTService } from "@app/contracts/services/jwt-service.js";

import { BcryptEncryptionService } from "@app/services/encryption-service.js";
import { JWTService } from "@app/services/jwt-service.js";
import { MongoUserRepository } from "@infra/database/mongo/repositories/mongo-user-repository.js";
import { AppConfig } from "@shared/config/app-config.js";


container.registerSingleton<AppConfig>("AppConfig", AppConfig);

container.registerSingleton<IUserRepository>(
  "UserRepository",
  MongoUserRepository,
);

container.registerSingleton<IEncryptionService>(
  "EncryptionService",
  BcryptEncryptionService,
);

container.registerSingleton<IJWTService>("JWTService", JWTService);
