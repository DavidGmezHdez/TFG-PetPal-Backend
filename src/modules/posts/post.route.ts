import { Router } from "express";
import { validate } from "express-validation";
import PostController from "./post.controller";
import passport from "passport";
import postValidation from "./post.validation";

export const PostRouter = Router()
    .get(
        "/",
        passport.authenticate("jwt", { session: false }),
        PostController.getAll
    )
    .get(
        "/:id",
        passport.authenticate("jwt", { session: false }),
        PostController.get
    )
    .post(
        "/",
        passport.authenticate("jwt", { session: false }),
        PostController.create
    )
    .delete(
        "/:id",
        passport.authenticate("jwt", { session: false }),
        PostController.destroy
    )
    .put(
        "/:id",
        passport.authenticate("jwt", { session: false }),

        PostController.update
    )
    .patch("/:id", PostController.partialUpdate);

export default PostRouter;
