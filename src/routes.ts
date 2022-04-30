import express from "express";
import { EventRouter } from "./events";
import { PetRouter } from "./pets";
import { PostRouter } from "./posts";
import { ProtectorRouter } from "./protectors";
import { UserRouter } from "./users";

export const router = express
    .Router()
    .use("/pets", PetRouter)
    .use("/events", EventRouter)
    .use("/posts", PostRouter)
    .use("/users", UserRouter)
    .use("/protectors", ProtectorRouter);
