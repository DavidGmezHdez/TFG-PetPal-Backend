import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    pets: [{ type: Schema.Types.ObjectId, ref: "Pet" }],
    hostEvents: [{ type: Schema.Types.ObjectId, ref: "Event" }],
    attendingEvents: [{ type: Schema.Types.ObjectId, ref: "Event" }]
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
