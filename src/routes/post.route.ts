import { Router } from "express";
import { validate } from "express-validation";
import { PostController } from "../controllers";
import passport from "passport";
import { postValidation, options } from "../validations";

const PostRouter = Router();

PostRouter.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    PostController.getAll
);

PostRouter.get(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    PostController.get
);

PostRouter.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    validate(postValidation.create, options),
    PostController.create
);

PostRouter.delete(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    PostController.destroy
);

PostRouter.put(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    validate(postValidation.update, options),
    PostController.update
);

PostRouter.patch(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    validate(postValidation.partialUpdate, options),
    PostController.partialUpdate
);

export default PostRouter;
