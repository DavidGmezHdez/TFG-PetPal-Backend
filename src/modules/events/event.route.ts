import { Router } from "express";
import EventController from "./event.controller";
import passport from "passport";

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
        EventController.update
    )
    .patch(
        "/:id",
        passport.authenticate("jwt", { session: false }),
        EventController.partialUpdate
    )
    .put(
        "/delete/:id",
        passport.authenticate("jwt", { session: false }),
        EventController.destroyEventReason
    );

export default EventRouter;
