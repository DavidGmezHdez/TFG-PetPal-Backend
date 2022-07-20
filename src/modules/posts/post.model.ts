import mongoose from "mongoose";

const Schema = mongoose.Schema;

const postSchema = new Schema(
    {
        text: { type: String, maxlength: 300, required: true },
        author: { type: Schema.Types.ObjectId, ref: "User", required: true },
        name: { type: String, required: true },
        likes: { type: Number, default: 0 },
        image: { type: String },
        imageKey: { type: String },
        comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }]
    },
    { timestamps: true }
);

const PostModel = mongoose.model("Post", postSchema);

export default PostModel;
