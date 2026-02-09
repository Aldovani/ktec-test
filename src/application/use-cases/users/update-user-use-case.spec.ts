import { User } from "@app/entities/user.js";
import { ResourceNotFound } from "@app/errors/application/resource-not-found.js";
import { BcryptEncryptionService } from "@app/services/encryption-service.js";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUserRepository } from "../../../../tests/repositories/in-memory-user-repository.js";
import { UpdateUserUseCase } from "./update-user-use-case.js";

describe("UpdateUserUseCase", () => {
  let sut: UpdateUserUseCase;
  let inMemoryUserRepository: InMemoryUserRepository;
  let encryptionService: BcryptEncryptionService;

  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    encryptionService = new BcryptEncryptionService();
    sut = new UpdateUserUseCase(inMemoryUserRepository, encryptionService);
  });

  it("should be able to update a user", async () => {
    const user = new User({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
      createdAt: new Date(),
    });

    inMemoryUserRepository.create(user);

    const input = {
      userId: user.id,
      name: "Changed Name",
      email: "changed.email@example.com",
    };

    await sut.execute(input);

    expect(inMemoryUserRepository.findById(user.id)).resolves.toEqual(
      expect.objectContaining({
        id: user.id,
        name: "Changed Name",
        email: "changed.email@example.com",
        createdAt: user.createdAt,
        password: expect.any(String),
      }),
    );
  });

  it("should throw an error if user does not exist", async () => {
    const input = {
      userId: "nonexistent-user-id",
      name: "Changed Name",
      email: "changed.email@example.com",
    };

    await expect(sut.execute(input)).rejects.toThrow("User not found");
  });
});
