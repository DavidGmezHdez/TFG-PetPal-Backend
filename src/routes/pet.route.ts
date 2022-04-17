import { Router } from "express";
import { validate } from "express-validation";
import { PetController } from "../controllers";
import passport from "passport";
import { petValidation, options } from "../validations";

const PetRouter = Router();

PetRouter.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    PetController.getAll
);

PetRouter.get(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    PetController.get
);

PetRouter.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    validate(petValidation.create, options),
    PetController.create
);

PetRouter.delete(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    PetController.destroy
);

PetRouter.put(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    validate(petValidation.update, options),
    PetController.update
);

PetRouter.patch(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    validate(petValidation.partialUpdate, options),
    PetController.partialUpdate
);

export default PetRouter;
