import { upload } from "@utils/multer";
import { Router } from "express";
import AuthController from "./auth.controller";

export const AuthRouter = Router()
    .post("/user/register", upload.single("image"), AuthController.registerUser)
    .post(
        "/protector/register",
        upload.single("image"),
        AuthController.registerProtector
    )
    .post("/login", AuthController.login);

export default AuthRouter;
