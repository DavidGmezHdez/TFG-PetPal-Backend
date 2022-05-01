import express from "express";
import { EventRouter } from "../modules/events";
import { PetRouter } from "../modules/pets";
import { PostRouter } from "../modules/posts";
import { ProtectorRouter } from "../modules/protectors";
import { UserRouter } from "../modules/users";

export const router = express
    .Router()
    .use("/pets", PetRouter)
    .use("/events", EventRouter)
    .use("/posts", PostRouter)
    .use("/users", UserRouter)
    .use("/protectors", ProtectorRouter);
