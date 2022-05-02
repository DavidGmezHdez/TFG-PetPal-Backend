import { NotFoundError } from "@utils/errors";
import PostModel from "./post.model";

export default class PostRepository {
    static async getAll() {
        const posts = await PostModel.find();
        if (posts === undefined) return new NotFoundError(`No posts available`);
        return posts;
    }

    static async get(id: string) {
        const post = await PostModel.findById(id);
        if (post === undefined) return new NotFoundError(`No post available`);
        return post;
    }

    static async create(post) {
        const createdPost = await PostModel.create(post);
        return createdPost;
    }

    static async partialUpdate(post) {
        const foundPost = await PostModel.findById(post.id);
        if (!foundPost) throw new NotFoundError(`Post doesn't exist`);
        const updatedPost = await PostModel.findByIdAndUpdate(
            { _id: post.id },
            { $set: post },
            { new: true }
        );
        return updatedPost;
    }

    static async update(post) {
        const foundPost = await PostModel.findById(post.id);
        if (!foundPost) throw new NotFoundError(`Post doesn't exist`);
        const updatedPost = await PostModel.findByIdAndUpdate(
            { _id: post.id },
            { $set: post },
            { new: true }
        );
        return updatedPost;
    }

    static async destroy(id: string) {
        const foundPost = await PostModel.findById(id);
        if (!foundPost) throw new NotFoundError(`Post doesn't exist`);
        const deletedPost = await PostModel.findByIdAndDelete(id);
        return deletedPost;
    }
}
