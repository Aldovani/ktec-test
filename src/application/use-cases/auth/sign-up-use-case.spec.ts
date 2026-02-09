import { EmailAlreadyInUse } from "@app/errors/application/email-already-in-use.js";
import { BcryptEncryptionService } from "@app/services/encryption-service.js";
import { JWTService } from "@app/services/jwt-service.js";
import { AppConfig } from "@shared/config/app-config.js";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUserRepository } from "../../../../tests/repositories/in-memory-user-repository.js";
import { SignUpUseCase } from "./sign-up-use-case.js";

describe("SignUpUseCase", () => {
  let sut: SignUpUseCase;
  let inMemoryUserRepository: InMemoryUserRepository;
  let encryptionService: BcryptEncryptionService;
  let jwtService: JWTService;

  let appConfig: AppConfig;

  beforeEach(() => {
    appConfig = new AppConfig();
    inMemoryUserRepository = new InMemoryUserRepository();
    encryptionService = new BcryptEncryptionService();
    jwtService = new JWTService(appConfig);

    sut = new SignUpUseCase(
      inMemoryUserRepository,
      encryptionService,
      jwtService,
    );
  });

  it("should create a user", async () => {
    const input = {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
    };

    const output = await sut.execute(input);

    expect(output).toEqual({
      accessToken: expect.any(String),
      refreshToken: expect.any(String),
    });
  });

  it("should throw an error if email already exists", async () => {
    const input = {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
    };

    await sut.execute(input);

    await expect(sut.execute(input)).rejects.toBeInstanceOf(EmailAlreadyInUse);
  });
});
