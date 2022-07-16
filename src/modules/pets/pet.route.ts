import { Router } from "express";
import PetController from "./pet.controller";
import passport from "passport";
import { upload } from "@utils/multer";

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
        upload.single("image"),
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
