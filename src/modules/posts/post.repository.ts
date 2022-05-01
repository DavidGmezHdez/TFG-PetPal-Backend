import PostModel from "./post.model";

export default class PostRepository {
    static async getAll() {
        return await PostModel.find();
    }

    static async get(id: string) {
        return await PostModel.findById(id);
    }

    static async create(post) {
        return await PostModel.create(post);
    }

    static async partialUpdate(post) {
        return await PostModel.findByIdAndUpdate(
            { _id: post.id },
            { $set: post },
            { new: true }
        );
    }

    static async update(post) {
        return await PostModel.findByIdAndUpdate(
            { _id: post.id },
            { $set: post },
            { new: true }
        );
    }

    static async destroy(id: string) {
        return await PostModel.findByIdAndDelete(id);
    }
}
