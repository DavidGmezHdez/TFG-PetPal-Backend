import { Router } from "express";
import { validate } from "express-validation";
import ProtectorController from "./protector.controller";
import passport from "passport";
import protectorValidation from "./protector.validation";

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
        validate(protectorValidation.update),
        ProtectorController.update
    )
    .patch(
        "/:id",
        passport.authenticate("jwt", { session: false }),
        validate(protectorValidation.partialUpdate),
        ProtectorController.partialUpdate
    );

export default ProtectorRouter;
