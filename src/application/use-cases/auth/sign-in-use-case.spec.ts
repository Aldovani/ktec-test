import { User } from "@app/entities/user.js";
import { BcryptEncryptionService } from "@app/services/encryption-service.js";
import { JWTService } from "@app/services/jwt-service.js";
import { AppConfig } from "@shared/config/app-config.js";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUserRepository } from "../../../../tests/repositories/in-memory-user-repository.js";
import { SignInUseCase } from "./sign-in-use-case.js";

describe("SignInUseCase", () => {
  let sut: SignInUseCase;
  let inMemoryUserRepository: InMemoryUserRepository;
  let encryptionService: BcryptEncryptionService;
  let jwtService: JWTService;

  let appConfig: AppConfig;

  beforeEach(() => {
    appConfig = new AppConfig();
    inMemoryUserRepository = new InMemoryUserRepository();
    encryptionService = new BcryptEncryptionService();
    jwtService = new JWTService(appConfig);

    sut = new SignInUseCase(
      inMemoryUserRepository,
      encryptionService,
      jwtService,
    );
  });

  it("should be able to sign in a user", async () => {
    inMemoryUserRepository.create(
      new User({
        name: "John Doe",
        email: "john.doe@example.com",
        password: await encryptionService.hash("password123"),
      }),
    );

    const input = {
      email: "john.doe@example.com",
      password: "password123",
    };

    const output = await sut.execute(input);
    expect(output).toEqual({
      accessToken: expect.any(String),
      refreshToken: expect.any(String),
    });
  });

  it("should throw an error if email does not exist", async () => {
    const input = {
      email: "nonexistent@example.com",
      password: "password123",
    };

    await expect(sut.execute(input)).rejects.toThrow();
  });
});
