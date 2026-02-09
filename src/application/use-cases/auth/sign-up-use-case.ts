import type { IUserRepository } from "@app/contracts/repositories/user-repository.js";
import type { IEncryptionService } from "@app/contracts/services/encryption-service.js";
import type { IJWTService } from "@app/contracts/services/jwt-service.js";
import { User } from "@app/entities/user.js";
import { EmailAlreadyInUse } from "@app/errors/application/email-already-in-use.js";
import { daysToSeconds } from "../../../utils/days-to-second.js";
import { inject, injectable } from "tsyringe";

@injectable()
export class SignUpUseCase {
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
    name,
  }: SignUpUseCase.Input): Promise<SignUpUseCase.Output> {
    const emailAlreadyExists = await this.userRepository.findByEmail(email);

    if (emailAlreadyExists) {
      throw new EmailAlreadyInUse();
    }

    const passwordHash = await this.encryptionService.hash(password);

    const user = new User({
      email,
      name,
      password: passwordHash,
    });

    await this.userRepository.create(user);

    const accessToken = this.jwtService.sign({
      userId: user.id,
    });

    const refreshToken = this.jwtService.sign(
      {
        userId: user.id,
      },
      {
        expiresIn: daysToSeconds(7),
      },
    );

    return {
      accessToken,
      refreshToken,
    };
  }
}

export namespace SignUpUseCase {
  export type Input = {
    name: string;
    email: string;
    password: string;
  };

  export type Output = {
    accessToken: string;
    refreshToken: string;
  };
}
