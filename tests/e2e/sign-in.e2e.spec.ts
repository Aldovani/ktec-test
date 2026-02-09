import type { IUserRepository } from "@app/contracts/repositories/user-repository.js";
import type { IEncryptionService } from "@app/contracts/services/encryption-service.js";
import { User } from "@app/entities/user.js";
import { faker } from "@faker-js/faker";
import { UserModel } from "@infra/database/mongo/schemas/user-schema.js";
import request from "supertest";
import { container } from "tsyringe";
import { beforeAll, describe, it } from "vitest";
import { App } from "../../src/app.js";

const server = container.resolve(App);

describe("Sign in e2e test", () => {

  beforeAll(async () => {
    await UserModel.deleteMany({});
  });

  it("should sign in successfully", async () => {
    const userRepository = container.resolve<IUserRepository>("UserRepository");
    const encrypt = container.resolve<IEncryptionService>("EncryptionService");

    const user = new User({
      email: faker.internet.email(),
      password: await encrypt.hash("Senha1234"),
      name: faker.internet.username(),
    });

    await userRepository.create(user);

    await request(server.getServer())
      .post("/auth/sign-in")
      .send({
        email: user.email,
        password: "Senha1234",
      })
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(200);
  });
});
