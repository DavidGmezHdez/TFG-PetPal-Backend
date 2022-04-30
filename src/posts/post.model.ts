import mongoose from "mongoose";

const Schema = mongoose.Schema;

const postSchema = new Schema({
    text: { type: String, maxlength: 300, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    likes: { qty: Number },
    image: { url: String }
});

const PostModel = mongoose.model("Post", postSchema);

export default PostModel;
