import { Router } from "express";
import { validate } from "express-validation";
import AuthController from "./auth.controller";

export const AuthRouter = Router()
    .post("/user/register", AuthController.registerUser)
    .post("/user/login", AuthController.loginUser)
    .post("/protector/register", AuthController.registerProtector)
    .post("/protector/login", AuthController.loginProtector);

export default AuthRouter;
