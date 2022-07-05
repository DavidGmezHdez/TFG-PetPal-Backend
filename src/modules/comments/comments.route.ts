import { Router } from "express";
import CommentController from "./comments.controller";
import passport from "passport";

export const CommentRouter = Router()
    .get(
        "/",
        passport.authenticate("jwt", { session: false }),
        CommentController.getAll
    )
    .get(
        "/:id",
        passport.authenticate("jwt", { session: false }),
        CommentController.get
    )
    .post(
        "/",
        passport.authenticate("jwt", { session: false }),
        CommentController.create
    )
    .delete(
        "/:id",
        passport.authenticate("jwt", { session: false }),
        CommentController.destroy
    )
    .put(
        "/:id",
        passport.authenticate("jwt", { session: false }),
        CommentController.update
    )
    .patch(
        "/:id",
        passport.authenticate("jwt", { session: false }),
        CommentController.partialUpdate
    );

export default CommentRouter;
