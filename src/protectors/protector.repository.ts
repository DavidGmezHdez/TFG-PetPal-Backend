import ProtectorModel from "./protector.model";

export default class ProtectorRepository {
    static getAll() {
        return ProtectorModel.find();
    }

    static get(id: number) {
        return ProtectorModel.findOne({
            id: id
        });
    }

    static async create(user) {
        return ProtectorModel.create(user);
    }

    static async partialUpdate(user) {}

    static async update(user) {}

    static async destroy(id: number) {}
}
