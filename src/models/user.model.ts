import mongoose from "mongoose";
import EventModel from "./event.model";
import PetModel from "./pet.model";
import PostModel from "./post.model";

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
