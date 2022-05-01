import ProtectorModel from "./protector.model";

export default class ProtectorRepository {
    static getAll() {
        return ProtectorModel.find();
    }

    static get(id: string) {
        return ProtectorModel.findById(id);
    }

    static async create(protector) {
        return ProtectorModel.create(protector);
    }

    static async partialUpdate(protector) {
        return await ProtectorModel.findByIdAndUpdate(
            { _id: protector.id },
            { $set: protector },
            { new: true }
        );
    }

    static async update(protector) {
        return await ProtectorModel.findByIdAndUpdate(
            { _id: protector.id },
            { $set: protector },
            { new: true }
        );
    }

    static async destroy(id: string) {
        return await ProtectorModel.findByIdAndDelete(id);
    }
}
