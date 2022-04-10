import { Router } from "express";
import { validate } from "express-validation";
import UserController from "../controllers/users.controller";
import passport from "passport";
import { userValidation, options } from "../validations";

const UserRouter = Router();

UserRouter.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    UserController.getAll
);

UserRouter.get(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    UserController.get
);

UserRouter.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    validate(userValidation.create, options),
    UserController.create
);

UserRouter.delete(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    UserController.destroy
);

UserRouter.put(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    validate(userValidation.update, options),
    UserController.update
);

UserRouter.patch(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    validate(userValidation.partialUpdate, options),
    UserController.partialUpdate
);

export default UserRouter;
