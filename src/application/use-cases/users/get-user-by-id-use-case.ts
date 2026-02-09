import { ResourceNotFound } from "@app/errors/application/resource-not-found.js";
import { inject, injectable } from "tsyringe";
import type { IUserRepository } from "../../contracts/repositories/user-repository.js";
import { User } from "../../entities/user.js";

@injectable()
export class GetUserByIdUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
  ) { }

  async execute({
    userId,
  }: GetUserByIdUseCase.Input): Promise<GetUserByIdUseCase.Output> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFound("User not found");
    }

    return user;
  }
}

export namespace GetUserByIdUseCase {
  export type Input = {
    userId: string;
  };

  export type Output = User;
}
