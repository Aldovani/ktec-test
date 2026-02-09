import { User } from "@app/entities/user.js";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUserRepository } from "../../../../tests/repositories/in-memory-user-repository.js";
import { DeleteUserUseCase } from "./delete-user-use-case.js";

describe("DeleteUserUseCase", () => {
  let sut: DeleteUserUseCase;
  let inMemoryUserRepository: InMemoryUserRepository;

  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();

    sut = new DeleteUserUseCase(inMemoryUserRepository);
  });

  it("should be able to delete a user", async () => {
    const user = new User({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
    });

    await inMemoryUserRepository.create(user);

    const input = {
      userId: user.id,
    };

    await sut.execute(input);

    expect(await inMemoryUserRepository.findById(user.id)).toBeNull();
  });
});
