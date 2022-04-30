import mongoose from "mongoose";
import { UserModel } from "../users";

const Schema = mongoose.Schema;

const postSchema = new Schema({
    text: { type: String, maxlength: 300 },
    author: { type: UserModel },
    likes: { qty: Number },
    image: { url: String }
});

const PostModel = mongoose.model("Post", postSchema);

export default PostModel;
