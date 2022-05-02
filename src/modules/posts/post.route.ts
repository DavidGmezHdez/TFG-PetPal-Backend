import { Router } from "express";
import { validate } from "express-validation";
import PostController from "./post.controller";
import passport from "passport";
import postValidation from "./post.validation";

export const PostRouter = Router()
    .get("/", PostController.getAll)
    .get(
        "/:id",
        passport.authenticate("jwt", { session: false }),
        PostController.get
    )
    .post("/", validate(postValidation.create), PostController.create)
    .delete(
        "/:id",
        passport.authenticate("jwt", { session: false }),
        PostController.destroy
    )
    .put("/:id", validate(postValidation.update), PostController.update)
    .patch(
        "/:id",
        validate(postValidation.partialUpdate),
        PostController.partialUpdate
    );

export default PostRouter;
