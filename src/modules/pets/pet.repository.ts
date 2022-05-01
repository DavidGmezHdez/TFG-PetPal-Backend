import PetModel from "./pet.model";

export default class PetRepository {
    static getAll() {
        return PetModel.find();
    }

    static get(id: string) {
        return PetModel.findById(id);
    }

    static async create(pet) {
        return PetModel.create(pet);
    }

    static async partialUpdate(pet) {
        return PetModel.findByIdAndUpdate({ _id: pet.id }, { $set: pet });
    }

    static async update(pet) {
        return PetModel.findByIdAndUpdate({ _id: pet.id }, { $set: pet });
    }

    static async destroy(id: string) {
        return PetModel.findByIdAndDelete(id);
    }
}
