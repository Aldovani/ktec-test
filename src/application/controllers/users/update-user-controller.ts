import { UpdateUserUseCase } from "@app/use-cases/users/update-user-use-case.js";
import { Schema } from "@kernel/decorators/schema.js";
import { container } from "tsyringe";
import { Controller } from "../../contracts/controller.js";
import {
  updateUserBodySchema,
  type UpdateUserBodySchema,
} from "./schemas/update-user-schema.js";

@Schema(updateUserBodySchema)
export class UpdateUserController extends Controller<
  "private",
  UpdateUserController.ResponseBody
> {
  protected async handle({
    userId,
    body: { email, name, password },
  }: UpdateUserController.Request): UpdateUserController.Response {
    const updateUserUseCase = container.resolve(UpdateUserUseCase);

    await updateUserUseCase.execute({
      userId,
      email,
      name,
      password,
    });

    return {
      statusCode: 204,
    };
  }
}

export namespace UpdateUserController {
  export type Request = Controller.Request<"private", UpdateUserBodySchema>;

  export type ResponseBody = undefined;
  export type Response = Promise<Controller.Response<ResponseBody>>;
}
