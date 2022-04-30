import mongoose from "mongoose";
import { EventModel } from "../events";
import { PetModel } from "../pets";
import { PostModel } from "../posts";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    posts: [{ type: PostModel }],
    pets: [{ type: PetModel }],
    hostEvents: [{ type: EventModel }],
    attendingEvents: [{ type: EventModel }]
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
