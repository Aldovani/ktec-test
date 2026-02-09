import type { IUserRepository } from "@app/contracts/repositories/user-repository.js";
import type { IJWTService } from "@app/contracts/services/jwt-service.js";
import { User } from "@app/entities/user.js";
import { faker } from "@faker-js/faker";
import { UserModel } from "@infra/database/mongo/schemas/user-schema.js";
import request from "supertest";
import { container } from "tsyringe";
import { beforeAll, describe, expect, it } from "vitest";
import { App } from "../../src/app.js";

const server = container.resolve(App);

describe("Get user e2e test", () => {
  beforeAll(async () => {
    await UserModel.deleteMany({});
  });

  it("should get user successfully", async () => {
    const userRepository = container.resolve<IUserRepository>("UserRepository");
    const jwtService = container.resolve<IJWTService>("JWTService");

    const user = new User({
      email: faker.internet.email(),
      password: "Senha1234",
      name: faker.internet.username(),
    });

    await userRepository.create(user);
    const token = jwtService.sign({ userId: user.id });

    const response = await request(server.getServer())
      .get("/users/me")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(200);

    expect(response.body).toMatchObject({
      createdAt: expect.any(String),
      id: user.id,
      email: user.email,
      name: user.name,
    });
  });
});
