import { PetModel } from "../models";

export default class PetRepository {
    static getAll() {
        return PetModel.find();
    }

    static get(id: number) {
        return PetModel.findOne({
            id: id
        });
    }

    static async create(pet) {
        return PetModel.create(pet);
    }

    static async partialUpdate(pet) {}

    static async update(pet) {}

    static async destroy(id: number) {}
}
