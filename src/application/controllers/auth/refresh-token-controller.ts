import { RefreshTokenUseCase } from "@app/use-cases/auth/refresh-token-use-case.js";
import { Schema } from "@kernel/decorators/schema.js";
import { container } from "tsyringe";
import { Controller } from "../../contracts/controller.js";
import {
  refreshTokenBodySchema,
  type RefreshTokenBodySchema,
} from "./schemas/refresh-token-schema.js";

@Schema(refreshTokenBodySchema)
export class RefreshTokenController extends Controller<
  "public",
  RefreshTokenController.ResponseBody
> {
  protected async handle({
    body,
  }: RefreshTokenController.Request): RefreshTokenController.Response {
    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

    const { accessToken, refreshToken } =
      await refreshTokenUseCase.execute(body);

    return {
      statusCode: 200,
      body: {
        accessToken,
        refreshToken,
      },
    };
  }
}

export namespace RefreshTokenController {
  export type Request = Controller.Request<"public", RefreshTokenBodySchema>;

  export type ResponseBody = {
    accessToken: string;
    refreshToken: string;
  };
  export type Response = Promise<Controller.Response<ResponseBody>>;
}
