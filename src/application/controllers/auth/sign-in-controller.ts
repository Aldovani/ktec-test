import { SignInUseCase } from "@app/use-cases/auth/sign-in-use-case.js";
import { Schema } from "@kernel/decorators/schema.js";
import { container } from "tsyringe";
import { Controller } from "../../contracts/controller.js";
import {
  signInBodySchema,
  type SignInBodySchema,
} from "./schemas/sign-in-schema.js";

@Schema(signInBodySchema)
export class SignInController extends Controller<
  "public",
  SignInController.ResponseBody
> {
  protected async handle({
    body,
  }: SignInController.Request): SignInController.Response {
    const signInUseCase = container.resolve(SignInUseCase);

    const { accessToken, refreshToken } = await signInUseCase.execute(body);

    return {
      statusCode: 200,
      body: {
        accessToken,
        refreshToken,
      },
    };
  }
}

export namespace SignInController {
  export type Request = Controller.Request<"public", SignInBodySchema>;

  export type ResponseBody = {
    accessToken: string;
    refreshToken: string;
  };
  export type Response = Promise<Controller.Response<ResponseBody>>;
}
