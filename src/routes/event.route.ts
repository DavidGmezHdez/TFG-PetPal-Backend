import { Router } from "express";
import { validate } from "express-validation";
import { EventController } from "../controllers";
import passport from "passport";
import { eventValidation, options } from "../validations";

const EventRouter = Router();

EventRouter.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    EventController.getAll
);

EventRouter.get(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    EventController.get
);

EventRouter.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    validate(eventValidation.create, options),
    EventController.create
);

EventRouter.delete(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    EventController.destroy
);

EventRouter.put(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    validate(eventValidation.update, options),
    EventController.update
);

EventRouter.patch(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    validate(eventValidation.partialUpdate, options),
    EventController.partialUpdate
);

export default EventRouter;
