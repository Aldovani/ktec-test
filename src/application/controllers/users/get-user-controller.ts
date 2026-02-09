import { GetUserByIdUseCase } from "@app/use-cases/users/get-user-by-id-use-case.js";
import { container } from "tsyringe";
import { Controller } from "../../contracts/controller.js";

export class GetUserByIdController extends Controller<
  "private",
  GetUserByIdController.ResponseBody
> {
  protected async handle({
    userId,
  }: GetUserByIdController.Request): GetUserByIdController.Response {
    const getUserByIdUseCase = container.resolve(GetUserByIdUseCase);

    const { createdAt, email, id, name } = await getUserByIdUseCase.execute({
      userId,
    });

    return {
      statusCode: 200,
      body: {
        name,
        email,
        id,
        createdAt,
      },
    };
  }
}

export namespace GetUserByIdController {
  export type Request = Controller.Request<"private">;

  export type ResponseBody = {
    name: string;
    email: string;
    id: string;
    createdAt: Date;
  };
  export type Response = Promise<Controller.Response<ResponseBody>>;
}
