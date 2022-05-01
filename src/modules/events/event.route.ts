import { Router } from "express";
import { validate } from "express-validation";
import EventController from "./event.controller";
import passport from "passport";
import eventValidation from "./event.validation";

export const EventRouter = Router()
    .get(
        "/",
        passport.authenticate("jwt", { session: false }),
        EventController.getAll
    )
    .get(
        "/:id",
        passport.authenticate("jwt", { session: false }),
        EventController.get
    )
    .post(
        "/",
        passport.authenticate("jwt", { session: false }),
        validate(eventValidation.create),
        EventController.create
    )
    .delete(
        "/:id",
        passport.authenticate("jwt", { session: false }),
        EventController.destroy
    )
    .put(
        "/:id",
        passport.authenticate("jwt", { session: false }),
        validate(eventValidation.update),
        EventController.update
    )
    .patch(
        "/:id",
        passport.authenticate("jwt", { session: false }),
        validate(eventValidation.partialUpdate),
        EventController.partialUpdate
    );

export default EventRouter;
