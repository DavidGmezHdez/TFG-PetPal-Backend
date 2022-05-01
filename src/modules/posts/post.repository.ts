import PostModel from "./post.model";

export default class PostRepository {
    static getAll() {
        return PostModel.find();
    }

    static get(id: string) {
        return PostModel.findById(id);
    }

    static async create(post) {
        return await PostModel.create(post);
    }

    static async partialUpdate(post) {
        return PostModel.findByIdAndUpdate({ _id: post.id }, { $set: post });
    }

    static async update(post) {
        return PostModel.findByIdAndUpdate({ _id: post.id }, { $set: post });
    }

    static async destroy(id: string) {
        return PostModel.findByIdAndDelete(id);
    }
}
