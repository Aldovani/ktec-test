import { User } from "@app/entities/user.js";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUserRepository } from "../../../../tests/repositories/in-memory-user-repository.js";
import { GetUserByIdUseCase } from "./get-user-by-id-use-case.js";

describe("GetUserByIdUseCase", () => {
  let sut: GetUserByIdUseCase;
  let inMemoryUserRepository: InMemoryUserRepository;

  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    sut = new GetUserByIdUseCase(inMemoryUserRepository);
  });

  it("should be able to get a user by id", async () => {
    const user = new User({
      name: "John Doe",
      email: "john.doe@example.com",
      password: 'password123',
    });

    inMemoryUserRepository.create(user);

    const input = {
      userId: user.id,
    };

    const output = await sut.execute(input);

    expect(output).toMatchObject(
      expect.objectContaining({
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        password: expect.any(String),
      }),
    );
  });

  it("should throw an error if user does not exist", async () => {
    const input = {
      userId: "nonexistent-user-id",
    };

    await expect(sut.execute(input)).rejects.toThrow("User not found");
  });
});
