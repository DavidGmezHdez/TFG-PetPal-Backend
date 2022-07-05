import mongoose from "mongoose";

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    comment: { type: String, required: true }
});

const CommentModel = mongoose.model("Comment", commentSchema);

export default CommentModel;
