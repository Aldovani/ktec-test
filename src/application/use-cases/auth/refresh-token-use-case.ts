import type { IUserRepository } from "@app/contracts/repositories/user-repository.js";
import type { IJWTService } from "@app/contracts/services/jwt-service.js";
import { InvalidRefreshTokenError } from "@app/errors/application/Invalid-token.js";
import { ResourceNotFound } from "@app/errors/application/resource-not-found.js";
import  JWT  from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { daysToSeconds } from "../../../utils/days-to-second.js";

@injectable()
export class RefreshTokenUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("JWTService")
    private jwtService: IJWTService,
  ) { }

  async execute({
    refreshToken,
  }: RefreshTokenUseCase.Input): Promise<RefreshTokenUseCase.Output> {
    try {
      const { userId } = this.jwtService.decode(refreshToken);

      if (!userId) {
        throw new InvalidRefreshTokenError();
      }

      const user = await this.userRepository.findById(userId);

      if (!user) {
        throw new ResourceNotFound("User not found");
      }

      const accessToken = this.jwtService.sign({ userId: user.id });
      const newRefreshToken = this.jwtService.sign(
        { userId: user.id },
        {
          expiresIn: daysToSeconds(7),
        },
      );

      return {
        accessToken,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      if (error instanceof JWT.JsonWebTokenError) {
        throw new InvalidRefreshTokenError();
      }

      throw error;
    }
  }
}

export namespace RefreshTokenUseCase {
  export type Input = {
    refreshToken: string;
  };

  export type Output = {
    accessToken: string;
    refreshToken: string;
  };
}
