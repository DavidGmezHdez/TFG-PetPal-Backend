import { Router } from "express";
import { validate } from "express-validation";
import UserController from "./users.controller";
import passport from "passport";
import userValidation from "./user.validations";
import { upload } from "@utils/multer";

export const UserRouter = Router()
    .get(
        "/",
        passport.authenticate("jwt", { session: false }),
        UserController.getAll
    )
    .get(
        "/:id",
        passport.authenticate("jwt", { session: false }),
        UserController.get
    )
    .post(
        "/",
        passport.authenticate("jwt", { session: false }),
        validate(userValidation.create),
        UserController.create
    )
    .delete(
        "/:id",
        passport.authenticate("jwt", { session: false }),
        UserController.destroy
    )
    .put(
        "/:id",
        passport.authenticate("jwt", { session: false }),
        validate(userValidation.update),
        UserController.update
    )
    .patch(
        "/:id",
        passport.authenticate("jwt", { session: false }),
        UserController.partialUpdate
    )
    .post(
        "/:id",
        passport.authenticate("jwt", { session: false }),
        upload.single("image"),
        UserController.imageUpdate
    );

export default UserRouter;
