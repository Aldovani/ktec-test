import { User } from "@app/entities/user.js";
import { InvalidRefreshTokenError } from "@app/errors/application/Invalid-token.js";
import { JWTService } from "@app/services/jwt-service.js";
import { AppConfig } from "@shared/config/app-config.js";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUserRepository } from "../../../../tests/repositories/in-memory-user-repository.js";
import { RefreshTokenUseCase } from "./refresh-token-use-case.js";

describe("RefreshTokenUseCase", () => {
  let sut: RefreshTokenUseCase;
  let inMemoryUserRepository: InMemoryUserRepository;
  let jwtService: JWTService;

  let appConfig: AppConfig;

  beforeEach(() => {
    appConfig = new AppConfig();
    inMemoryUserRepository = new InMemoryUserRepository();
    jwtService = new JWTService(appConfig);

    sut = new RefreshTokenUseCase(inMemoryUserRepository, jwtService);
  });

  it("should be able to sign in a user", async () => {
    const user = new User({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
    });

    inMemoryUserRepository.create(user);

    const input = {
      refreshToken: jwtService.sign({ userId: user.id }),
    };

    const output = await sut.execute(input);

    expect(output).toEqual({
      accessToken: expect.any(String),
      refreshToken: expect.any(String),
    });
  });

  it("should throw an error if refresh token is invalid", async () => {
    const input = {
      refreshToken: "invalid-refresh-token",
    };

    await expect(sut.execute(input)).rejects.toThrow(InvalidRefreshTokenError);
  });

  it("should throw an error if user does not exist", async () => {
    const input = {
      refreshToken: jwtService.sign({ userId: "nonexistent-user-id" }),
    };

    await expect(sut.execute(input)).rejects.toThrow("User not found");
  });
});
