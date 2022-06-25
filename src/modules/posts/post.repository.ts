import { UserModel } from "@modules/users";
import { NotFoundError } from "@utils/errors";
import PostModel from "./post.model";

export default class PostRepository {
    static async getAll() {
        const posts = await PostModel.find().sort({ createdAt: -1 });
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
        console.log(deletedPost);
        if (!deletedPost) throw new NotFoundError(`Post doesn't exist`);
        return deletedPost;
    }
}
