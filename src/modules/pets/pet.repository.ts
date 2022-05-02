import PetModel from "./pet.model";
import { NotFoundError, InternalError } from "@utils/errors";

export default class PetRepository {
    static async getAll() {
        const pets = await PetModel.find();
        if (pets === undefined) throw new NotFoundError(`No pet available`);
        return pets;
    }

    static async get(id: string) {
        const pet = await PetModel.findById(id);
        if (pet === undefined) throw new NotFoundError(`No pet available`);
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
        const foundPet = await PetModel.findById(pet.id);
        if (!foundPet) throw new NotFoundError(`Pet doesn't exist`);
        const updatedPet = await PetModel.findByIdAndUpdate(
            { _id: pet.id },
            { $set: pet },
            { new: true }
        );
        return updatedPet;
    }

    static async update(pet) {
        const foundPet = await PetModel.findById(pet.id);
        if (!foundPet) throw new NotFoundError(`Pet doesn't exist`);
        const updatedPet = await PetModel.findByIdAndUpdate(
            { _id: pet.id },
            { $set: pet },
            { new: true }
        );
        return updatedPet;
    }

    static async destroy(id: string) {
        const foundPet = await PetModel.findById(id);
        if (!foundPet) return new NotFoundError(`Pet doesn't exist`);
        const deletedPet = await PetModel.findByIdAndDelete(id);
        return deletedPet;
    }
}
