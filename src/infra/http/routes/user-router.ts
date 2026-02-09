import { DeleteUserController } from "@app/controllers/users/delete-user-controller.js";
import { GetUserByIdController } from "@app/controllers/users/get-user-controller.js";
import { UpdateUserController } from "@app/controllers/users/update-user-controller.js";
import { expressHttpAdapter } from "@kernel/adapters/express-http-adapter.js";
import { Router } from "express";
import { authMiddlewareHandler } from "../middleware/auth-middleware.js";

export const userRoutes = Router();

const getUserByIdController = new GetUserByIdController();
const deleteUserController = new DeleteUserController();
const updateUserController = new UpdateUserController();

userRoutes.get(
  "/users/me",
  authMiddlewareHandler,
  expressHttpAdapter(getUserByIdController),
);
userRoutes.delete(
  "/users",
  authMiddlewareHandler,
  expressHttpAdapter(deleteUserController),
);
userRoutes.put(
  "/users",
  authMiddlewareHandler,
  expressHttpAdapter(updateUserController),
);
