import mongoose from "mongoose";

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    host: { type: Schema.Types.ObjectId, ref: "User" },
    attendants: [{ type: Schema.Types.ObjectId, ref: "User" }],
    price: { type: Number },
    date: { type: Date, required: true },
    place: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String }
});

const EventModel = mongoose.model("Event", eventSchema);

export default EventModel;
