import { UserModel } from "@modules/users";
import { NotFoundError } from "@utils/errors";
import CommentModel from "./comments.model";

export default class CommentRepository {
    static async getAll() {
        const comments = await CommentModel.find().lean().sort({ date: -1 });
        if (!comments.length) throw new NotFoundError(`No events available`);
        return comments;
    }

    static async get(id: string) {
        const comment = await CommentModel.findById(id).lean();
        if (!comment) throw new NotFoundError(`No event available`);
        const finalComent = this.fetchUserDataComent(comment);
        return finalComent;
    }

    static async create(comment) {
        const createdComment = await CommentModel.create(comment);
        const author = await UserModel.findOne(comment.author._id).lean();
        const formatedComment = { ...createdComment._doc, author: author };
        return formatedComment;
    }

    static async partialUpdate(comment) {
        const updatedComment = await CommentModel.findByIdAndUpdate(
            { _id: comment.id },
            { $set: comment },
            { new: true }
        ).lean();
        if (!updatedComment) throw new NotFoundError(`Comment doesn't exist`);
        const finalComment = this.fetchUserDataComent(updatedComment);
        return finalComment;
    }

    static async update(comment) {
        const updatedComment = await CommentModel.findByIdAndUpdate(
            { _id: comment.id },
            { $set: comment },
            { new: true }
        ).lean();
        if (!updatedComment) throw new NotFoundError(`Event doesn't exist`);
        const finalComment = this.fetchUserDataComent(updatedComment);
        return finalComment;
    }

    static async destroy(id: string) {
        const deletedComment = await CommentModel.findByIdAndDelete(id);
        if (!deletedComment)
            throw new NotFoundError(`No existe tal comentario`);
        return deletedComment;
    }

    static async fetchUserDataComent(coment) {
        const host = await UserModel.findOne(coment.author._id).lean();
        const commentEvent = {
            ...coment,
            author: host.name
        };

        return commentEvent;
    }
}
