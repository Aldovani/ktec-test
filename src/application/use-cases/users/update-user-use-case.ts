import { EmailAlreadyInUse } from "@app/errors/application/email-already-in-use.js";
import { ResourceNotFound } from "@app/errors/application/resource-not-found.js";
import { inject, injectable } from "tsyringe";
import type { IUserRepository } from "../../contracts/repositories/user-repository.js";
import type { IEncryptionService } from "../../contracts/services/encryption-service.js";

@injectable()
export class UpdateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("EncryptionService")
    private encryptionService: IEncryptionService,
  ) { }

  async execute({
    email,
    name,
    password,
    userId,
  }: UpdateUserUseCase.Input): Promise<UpdateUserUseCase.Output> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFound("User not found");
    }

    if (email !== user.email && email !== undefined) {
      const emailAlreadyExists = await this.userRepository.findByEmail(email);

      if (emailAlreadyExists) {
        throw new EmailAlreadyInUse();
      }

      user.email = email;
    }

    if (password !== user.password && password !== undefined) {
      const passwordHash = await this.encryptionService.hash(password);

      user.password = passwordHash;
    }

    user.name = name || user.name;
    await this.userRepository.update(user);
  }
}
export namespace UpdateUserUseCase {
  export type Input = {
    name?: string | undefined;
    email?: string | undefined;
    password?: string | undefined;
    userId: string;
  };

  export type Output = void;
}
