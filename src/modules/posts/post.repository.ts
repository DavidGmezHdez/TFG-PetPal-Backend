import { UserModel } from "@modules/users";
import { NotFoundError } from "@utils/errors";
import PostModel from "./post.model";

export default class PostRepository {
    static async getAll() {
        const posts = await PostModel.find();
        if (!posts.length) throw new NotFoundError(`No posts available`);
        return posts;
    }

    static async get(id: string) {
        const post = await PostModel.findById(id);
        if (!post) throw new NotFoundError(`No post available`);
        return post;
    }

    static async create(post) {
        const createdPost = await PostModel.create(post);
        await UserModel.updateOne(
            { _id: post.author },
            { $push: { posts: createdPost._id } }
        );
        return createdPost;
    }

    static async partialUpdate(post) {
        const updatedPost = await PostModel.findByIdAndUpdate(
            { _id: post.id },
            { $set: post },
            { new: true }
        );
        if (!updatedPost) throw new NotFoundError(`Post doesn't exist`);
        return updatedPost;
    }

    static async update(post) {
        const updatedPost = await PostModel.findByIdAndUpdate(
            { _id: post.id },
            { $set: post },
            { new: true }
        );
        if (!updatedPost) throw new NotFoundError(`Post doesn't exist`);
        return updatedPost;
    }

    static async destroy(id: string) {
        const deletedPost = await PostModel.findByIdAndDelete(id);
        if (!deletedPost) throw new NotFoundError(`Post doesn't exist`);
        await UserModel.updateOne(
            { _id: deletedPost.author },
            { $pull: { posts: deletedPost._id } },
            { safe: true, multi: false }
        );
        return deletedPost;
    }
}
