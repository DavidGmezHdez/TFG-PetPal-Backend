import { PostModel } from "../models";

export default class PostRepository {
    static getAll() {
        return PostModel.find();
    }

    static get(id: number) {
        return PostModel.findOne({
            id: id
        });
    }

    static async create(post) {
        return PostModel.create(post);
    }

    static async partialUpdate(post) {}

    static async update(post) {}

    static async destroy(id: number) {}
}
