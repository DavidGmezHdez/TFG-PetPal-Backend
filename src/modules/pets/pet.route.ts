import { Router } from "express";
import { validate } from "express-validation";
import PetController from "./pet.controller";
import passport from "passport";
import petValidation from "./pet.validation";

export const PetRouter = Router()
    .get(
        "/",
        passport.authenticate("jwt", { session: false }),
        PetController.getAll
    )
    .get(
        "/:id",
        passport.authenticate("jwt", { session: false }),
        PetController.get
    )
    .post(
        "/",
        passport.authenticate("jwt", { session: false }),
        PetController.create
    )
    .delete(
        "/:id",
        passport.authenticate("jwt", { session: false }),
        PetController.destroy
    )
    .put(
        "/:id",
        passport.authenticate("jwt", { session: false }),
        PetController.update
    )
    .patch(
        "/:id",
        passport.authenticate("jwt", { session: false }),
        PetController.partialUpdate
    );

export default PetRouter;
