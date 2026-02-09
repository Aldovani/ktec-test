import type { IUserRepository } from "@app/contracts/repositories/user-repository.js";
import type { IEncryptionService } from "@app/contracts/services/encryption-service.js";
import type { IJWTService } from "@app/contracts/services/jwt-service.js";
import { InvalidCredentialsError } from "@app/errors/application/Invalid-credentials.js";
import { inject, injectable } from "tsyringe";

@injectable()
export class SignInUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("EncryptionService")
    private encryptionService: IEncryptionService,
    @inject("JWTService")
    private jwtService: IJWTService,
  ) { }

  async execute({
    email,
    password,
  }: SignInUseCase.Input): Promise<SignInUseCase.Output> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const isPasswordValid = await this.encryptionService.compare(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new InvalidCredentialsError();
    }

    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
      refreshToken: this.jwtService.sign({ userId: user.id }),
    };
  }
}

export namespace SignInUseCase {
  export type Input = {
    email: string;
    password: string;
  };

  export type Output = {
    accessToken: string;
    refreshToken: string;
  };
}
