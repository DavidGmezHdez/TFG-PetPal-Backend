import mongoose from "mongoose";
import { UserModel } from "../users";

const Schema = mongoose.Schema;

const petSchema = new Schema({
    name: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    age: { type: Number, required: true },
    color: { type: String },
    size: { type: String },
    specialTraits: [{ type: String }],
    owner: { type: UserModel }
});

const PetModel = mongoose.model("Pet", petSchema);

export default PetModel;
