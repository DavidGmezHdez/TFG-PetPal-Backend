import { Router } from "express";
import { validate } from "express-validation";
import { ProtectorController } from "../controllers";
import passport from "passport";
import { protectorValidation, options } from "../validations";

const ProtectorRouter = Router();

ProtectorRouter.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    ProtectorController.getAll
);

ProtectorRouter.get(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    ProtectorController.get
);

ProtectorRouter.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    validate(protectorValidation.create, options),
    ProtectorController.create
);

ProtectorRouter.delete(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    ProtectorController.destroy
);

ProtectorRouter.put(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    validate(protectorValidation.update, options),
    ProtectorController.update
);

ProtectorRouter.patch(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    validate(protectorValidation.partialUpdate, options),
    ProtectorController.partialUpdate
);

export default ProtectorRouter;
