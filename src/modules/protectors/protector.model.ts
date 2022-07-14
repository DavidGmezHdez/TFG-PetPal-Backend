import mongoose from "mongoose";

const Schema = mongoose.Schema;

const protectorsSchema = new Schema({
    email: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    posts: [{ type: Schema.Types.ObjectId, ref: "Post", default: null }],
    likedPosts: [{ type: Schema.Types.ObjectId, ref: "Post", default: null }],
    pets: [{ type: Schema.Types.ObjectId, ref: "Pet", default: null }],
    region: { type: String, required: true },
    direction: { type: String, required: true },
    contactPhone: { type: String, unique: true, required: true }
});

const ProtectorModel = mongoose.model("Protector", protectorsSchema);

export default ProtectorModel;
