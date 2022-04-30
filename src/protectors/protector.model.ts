import mongoose from "mongoose";

const Schema = mongoose.Schema;

const protectorsSchema = new Schema({
    email: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    posts: { type: Schema.Types.ObjectId, ref: "Post" },
    availablePets: { type: Schema.Types.ObjectId, ref: "Pet" },
    region: { type: String },
    contactPhone: { type: String, unique: true, required: true }
});

const ProtectorModel = mongoose.model("Protector", protectorsSchema);

export default ProtectorModel;
