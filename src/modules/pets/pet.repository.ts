import PetModel from "./pet.model";

export default class PetRepository {
    static async getAll() {
        return await PetModel.find();
    }

    static async get(id: string) {
        return await PetModel.findById(id);
    }

    static async create(pet) {
        return await PetModel.create(pet);
    }

    static async partialUpdate(pet) {
        return await PetModel.findByIdAndUpdate(
            { _id: pet.id },
            { $set: pet },
            { new: true }
        );
    }

    static async update(pet) {
        return await PetModel.findByIdAndUpdate(
            { _id: pet.id },
            { $set: pet },
            { new: true }
        );
    }

    static async destroy(id: string) {
        return await PetModel.findByIdAndDelete(id);
    }
}
