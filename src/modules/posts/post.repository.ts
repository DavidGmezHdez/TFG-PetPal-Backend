import { InternalError, NotFoundError } from "@utils/errors";
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
        try {
            const createdPost = await PostModel.create(post);
            return createdPost;
        } catch (error) {
            return new InternalError(
                `Error while creating post: ${error.message}`
            );
        }
    }

    static async partialUpdate(post) {
        try {
            const foundPost = await PostModel.findById(post.id);
            if (!foundPost) return new NotFoundError(`Post doesn't exist`);
            const updatedPost = await PostModel.findByIdAndUpdate(
                { _id: post.id },
                { $set: post },
                { new: true }
            );
            return updatedPost;
        } catch (error) {
            return new InternalError(
                `Error while updating post: ${error.message}`
            );
        }
    }

    static async update(post) {
        try {
            const foundPost = await PostModel.findById(post.id);
            if (!foundPost) return new NotFoundError(`Post doesn't exist`);
            const updatedPost = await PostModel.findByIdAndUpdate(
                { _id: post.id },
                { $set: post },
                { new: true }
            );
            return updatedPost;
        } catch (error) {
            return new InternalError(
                `Error while updating post: ${error.message}`
            );
        }
    }

    static async destroy(id: string) {
        try {
            const foundPost = await PostModel.findById(id);
            if (!foundPost) return new NotFoundError(`Post doesn't exist`);
            const deletedPost = await PostModel.findByIdAndDelete(id);
            return deletedPost;
        } catch (error) {
            return new InternalError(
                `Error while deleting post: ${error.message}`
            );
        }
    }
}
