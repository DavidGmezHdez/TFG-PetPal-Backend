import mongoose from "mongoose";
import UserModel from "./user.model";

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    host: { type: UserModel, required: true },
    attendants: [{ type: UserModel }],
    price: { type: Number },
    date: { type: Date, required: true },
    place: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String }
});

const EventModel = mongoose.model("Event", eventSchema);

export default EventModel;
