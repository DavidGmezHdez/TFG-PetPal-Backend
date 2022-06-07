import { Router } from "express";
import AuthController from "./auth.controller";

export const AuthRouter = Router()
    .post("/user/register", AuthController.registerUser)
    .post("/protector/register", AuthController.registerProtector)
    .post("/login", AuthController.login);

export default AuthRouter;
