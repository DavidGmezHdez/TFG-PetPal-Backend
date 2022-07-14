import mongoose from "mongoose";

const Schema = mongoose.Schema;

const petSchema = new Schema({
    name: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    age: { type: Number, required: true },
    race: { type: String },
    color: { type: String },
    size: { type: String },
    image: { type: String },
    region: { type: String },
    owner: { type: Schema.Types.ObjectId, ref: "User", default: null },
    protector: { type: Schema.Types.ObjectId, ref: "Protector" }
});

const PetModel = mongoose.model("Pet", petSchema);

export default PetModel;
