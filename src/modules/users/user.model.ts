import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    posts: [{ type: Schema.Types.ObjectId, ref: "Post", default: null }],
    likedPosts: [{ type: Schema.Types.ObjectId, ref: "Post", default: null }],
    pets: [{ type: Schema.Types.ObjectId, ref: "Pet", default: null }],
    hostEvents: [{ type: Schema.Types.ObjectId, ref: "Event", default: null }],
    attendingEvents: [
        { type: Schema.Types.ObjectId, ref: "Event", default: null }
    ]
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
