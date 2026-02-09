import { inject, injectable } from "tsyringe";
import type { IUserRepository } from "../../contracts/repositories/user-repository.js";

@injectable()
export class DeleteUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository) { }

  async execute({
    userId,
  }: DeleteUserUseCase.Input): Promise<DeleteUserUseCase.Output> {
    await this.userRepository.delete(userId);
  }
}

export namespace DeleteUserUseCase {
  export type Input = {
    userId: string;
  };

  export type Output = void;
}
