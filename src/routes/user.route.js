import { Router } from "express";
import { validate } from "express-validation";
import { UserController } from "../controllers";
import passport from "passport";

const UserRouter = Router();

UserRouter.post("/login", UserController.login);

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
    validate(UserRouter.create, options),
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
    validate(UserRouter.update, options),
    UserController.update
);

UserRouter.patch(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    validate(UserRouter.partialUpdate, options),
    UserController.partialUpdate
);

export default UserRouter;
