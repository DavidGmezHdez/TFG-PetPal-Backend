import { CommentRepository } from "@modules/comments";
import { ProtectorModel } from "@modules/protectors";
import { UserModel } from "@modules/users";
import { NotFoundError } from "@utils/errors";
import { s3Service } from "@utils/s3Service";
import PostModel from "./post.model";

export default class PostRepository {
    static async getAll() {
        const posts = await PostModel.find()
            .populate("author")
            .populate("comments")
            .sort({ createdAt: -1 });

        if (!posts.length) throw new NotFoundError(`No hay posts disponibles`);
        return posts;
    }

    static async get(id: string) {
        const post = await PostModel.findById(id);
        if (!post) throw new NotFoundError(`No hay posts disponibles`);
        return post;
    }

    static async create({ post, image }) {
        const s3Result = image
            ? await s3Service.s3UploadV2(image, "posts")
            : { Location: undefined, Key: undefined };
        const sendPet = {
            ...post,
            image: s3Result.Location,
            imageKey: s3Result.Key
        };
        const createdPost = await PostModel.create(sendPet);
        return createdPost;
    }

    static async partialUpdate(post) {
        const updatedPost = await PostModel.findByIdAndUpdate(
            { _id: post.id },
            { $set: post },
            { new: true }
        );
        if (!updatedPost) throw new NotFoundError(`No existe tal post`);
        return updatedPost;
    }

    static async update(post) {
        const updatedPost = await PostModel.findByIdAndUpdate(
            { _id: post.id },
            { $set: post },
            { new: true }
        );
        if (!updatedPost) throw new NotFoundError(`No existe tal post`);
        return updatedPost;
    }

    static async destroy(id: string) {
        const deletedPost = await PostModel.findByIdAndDelete(id);
        if (!deletedPost) throw new NotFoundError(`No existe tal post`);

        for (const comment of deletedPost.comments) {
            await CommentRepository.destroy(comment._id);
        }

        await UserModel.findByIdAndUpdate(
            { _id: deletedPost.author },
            { $pull: { posts: { $in: [id] } } }
        );

        await UserModel.updateMany(
            { likedPosts: { $elemMatch: { $eq: id } } },
            { $pull: { likedPosts: { $in: [id] } } }
        );
        await ProtectorModel.updateMany(
            { likedPosts: { $elemMatch: { $eq: id } } },
            { $pull: { likedPosts: { $in: [id] } } }
        );

        if (deletedPost.imageKey)
            await s3Service.s3DeleteV2(deletedPost.imageKey);
        return deletedPost;
    }

    static async createComment(id, comment) {
        const createdComment = await CommentRepository.create(comment);
        const updatedPost = await PostModel.findByIdAndUpdate(
            { _id: id },
            { $push: { comments: createdComment._id } },
            { new: true }
        ).populate("comments");

        return updatedPost;
    }

    static async destroyComment(id: string, commentId: string) {
        const updatedPost = await PostModel.findByIdAndUpdate(
            { _id: id },
            { $pull: { comments: { $in: [commentId] } } },
            { new: true }
        ).populate("comments");
        await CommentRepository.destroy(commentId);
        return updatedPost;
    }
}
