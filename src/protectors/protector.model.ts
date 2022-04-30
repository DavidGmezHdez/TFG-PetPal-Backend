import mongoose from "mongoose";
import { PetModel } from "../pets";
import { PostModel } from "../posts";

const Schema = mongoose.Schema;

const protectorsSchema = new Schema({
    email: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    posts: [{ type: PostModel }],
    availablePets: [{ type: PetModel }],
    region: { type: String },
    contactPhone: { type: String, unique: true, required: true }
});

const ProtectorModel = mongoose.model("Protector", protectorsSchema);

export default ProtectorModel;
