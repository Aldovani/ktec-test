import { DeleteUserUseCase } from "@app/use-cases/users/delete-user-use-case.js";
import { container } from "tsyringe";
import { Controller } from "../../contracts/controller.js";

export class DeleteUserController extends Controller<
  "private",
  DeleteUserController.ResponseBody
> {
  protected async handle({
    userId,
  }: DeleteUserController.Request): DeleteUserController.Response {
    const deleteUserUseCase = container.resolve(DeleteUserUseCase);

    await deleteUserUseCase.execute({
      userId,
    });

    return {
      statusCode: 204,
    };
  }
}

export namespace DeleteUserController {
  export type Request = Controller.Request<"private">;

  export type ResponseBody = undefined;
  export type Response = Promise<Controller.Response<ResponseBody>>;
}
