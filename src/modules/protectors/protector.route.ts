import { Router } from "express";
import { validate } from "express-validation";
import ProtectorController from "./protector.controller";
import passport from "passport";
import protectorValidation from "./protector.validation";
import { upload } from "@utils/multer";

export const ProtectorRouter = Router()
    .get(
        "/",
        passport.authenticate("jwt", { session: false }),
        ProtectorController.getAll
    )
    .get(
        "/:id",
        passport.authenticate("jwt", { session: false }),
        ProtectorController.get
    )
    .post(
        "/",
        passport.authenticate("jwt", { session: false }),
        validate(protectorValidation.create),
        ProtectorController.create
    )
    .delete(
        "/:id",
        passport.authenticate("jwt", { session: false }),
        ProtectorController.destroy
    )
    .put(
        "/:id",
        passport.authenticate("jwt", { session: false }),
        ProtectorController.update
    )
    .patch(
        "/:id",
        passport.authenticate("jwt", { session: false }),
        ProtectorController.partialUpdate
    )
    .post(
        "/:id",
        passport.authenticate("jwt", { session: false }),
        upload.single("image"),
        ProtectorController.imageUpdate
    );

export default ProtectorRouter;
