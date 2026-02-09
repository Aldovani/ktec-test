import { SignUpUseCase } from "@app/use-cases/auth/sign-up-use-case.js";
import { Schema } from "@kernel/decorators/schema.js";
import { container } from "tsyringe";
import { Controller } from "../../contracts/controller.js";
import {
  signUpBodySchema,
  type SignUpBodySchema,
} from "./schemas/sign-up-schema.js";

@Schema(signUpBodySchema)
export class SignUpController extends Controller<
  "public",
  SignUpController.ResponseBody
> {
  protected async handle({
    body,
  }: SignUpController.Request): SignUpController.Response {
    const signUpUseCase = container.resolve(SignUpUseCase);

    const { accessToken, refreshToken } = await signUpUseCase.execute(body);

    return {
      statusCode: 201,
      body: {
        accessToken,
        refreshToken,
      },
    };
  }
}

export namespace SignUpController {
  export type Request = Controller.Request<"public", SignUpBodySchema>;

  export type ResponseBody = {
    accessToken: string;
    refreshToken: string;
  };
  export type Response = Promise<Controller.Response<ResponseBody>>;
}
