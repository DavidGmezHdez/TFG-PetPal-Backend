import PetModel from "./pet.model";
import { NotFoundError, InternalError } from "@utils/errors";

export default class PetRepository {
    static async getAll() {
        const pets = await PetModel.find();
        if (!pets.length) throw new NotFoundError(`No pets available`);
        return pets;
    }

    static async get(id: string) {
        const pet = await PetModel.findById(id);
        if (!pet) throw new NotFoundError(`No pet available`);
        return pet;
    }

    static async create(pet) {
        const foundedPet = await PetModel.findOne({ name: pet.name });
        if (foundedPet)
            return new InternalError(
                `Error while creating pet: Pet with that name already exists`
            );
        const createdPet = await PetModel.create(pet);
        return createdPet;
    }

    static async partialUpdate(pet) {
        const updatedPet = await PetModel.findByIdAndUpdate(
            { _id: pet.id },
            { $set: pet },
            { new: true }
        );
        if (!updatedPet) throw new NotFoundError(`Pet doesn't exist`);
        return updatedPet;
    }

    static async update(pet) {
        const updatedPet = await PetModel.findByIdAndUpdate(
            { _id: pet.id },
            { $set: pet },
            { new: true }
        );
        if (!updatedPet) throw new NotFoundError(`Pet doesn't exist`);
        return updatedPet;
    }

    static async destroy(id: string) {
        const deletedPet = await PetModel.findByIdAndDelete(id);
        if (!deletedPet) return new NotFoundError(`Pet doesn't exist`);
        return deletedPet;
    }
}
