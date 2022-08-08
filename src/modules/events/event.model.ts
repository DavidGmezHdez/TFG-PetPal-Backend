import mongoose from "mongoose";

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    host: { type: Schema.Types.ObjectId, ref: "User", required: true },
    attendants: [{ type: Schema.Types.ObjectId, ref: "User", default: null }],
    price: { type: Number },
    date: { type: Date, required: true },
    place: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    region: { type: String }
});

const EventModel = mongoose.model("Event", eventSchema);

export default EventModel;
