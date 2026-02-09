import { RefreshTokenController } from "@app/controllers/auth/refresh-token-controller.js";
import { SignInController } from "@app/controllers/auth/sign-in-controller.js";
import { SignUpController } from "@app/controllers/auth/sign-up-controller.js";
import { expressHttpAdapter } from "@kernel/adapters/express-http-adapter.js";
import { Router } from "express";

export const authRoutes = Router();

const signInController = new SignInController();
const signUpController = new SignUpController();
const refreshTokenController = new RefreshTokenController();

authRoutes.post("/auth/sign-up", expressHttpAdapter(signUpController));
authRoutes.post("/auth/sign-in", expressHttpAdapter(signInController));
authRoutes.post(
  "/auth/refresh-token",
  expressHttpAdapter(refreshTokenController),
);
