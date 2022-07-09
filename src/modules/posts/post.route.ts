import { Router } from "express";
import PostController from "./post.controller";
import passport from "passport";

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
    .patch(
        "/:id",
        passport.authenticate("jwt", { session: false }),
        PostController.partialUpdate
    )
    .patch(
        "/comment/:id",
        passport.authenticate("jwt", { session: false }),
        PostController.createComment
    )
    .delete(
        "/comment/:id",
        passport.authenticate("jwt", { session: false }),
        PostController.destroyComment
    );

export default PostRouter;
