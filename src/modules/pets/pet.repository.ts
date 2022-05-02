import PetModel from "./pet.model";
import { NotFoundError, InternalError } from "@utils/errors";

export default class PetRepository {
    static async getAll() {
        const pets = await PetModel.find();
        if (pets === undefined) return new NotFoundError(`No pet available`);
        return pets;
    }

    static async get(id: string) {
        const pet = await PetModel.findById(id);
        if (pet === undefined) return new NotFoundError(`No pet available`);
        return pet;
    }

    static async create(pet) {
        try {
            const foundedPet = await PetModel.findOne({ name: pet.name });
            if (foundedPet)
                return new InternalError(
                    `Error while creating pet: Pet with that name already exists`
                );
            const createdPet = await PetModel.create(pet);
            return createdPet;
        } catch (error) {
            return new InternalError(
                `Error while creating pet: ${error.message}`
            );
        }
    }

    static async partialUpdate(pet) {
        try {
            const foundPet = await PetModel.findOne({ _id: pet.id });
            if (!foundPet) return new NotFoundError(`Pet doesn't exist`);
            const updatedPet = await PetModel.findByIdAndUpdate(
                { _id: pet.id },
                { $set: pet },
                { new: true }
            );
            return updatedPet;
        } catch (error) {
            return new InternalError(
                `Error while updating pet: ${error.message}`
            );
        }
    }

    static async update(pet) {
        try {
            const foundPet = await PetModel.findOne({ _id: pet.id });
            if (!foundPet) return new NotFoundError(`Pet doesn't exist`);
            const updatedPet = await PetModel.findByIdAndUpdate(
                { _id: pet.id },
                { $set: pet },
                { new: true }
            );
            return updatedPet;
        } catch (error) {
            return new InternalError(
                `Error while updating pet: ${error.message}`
            );
        }
    }

    static async destroy(id: string) {
        try {
            const foundPet = await PetModel.findOne({ _id: id });
            if (!foundPet) return new NotFoundError(`Pet doesn't exist`);
            const deletedPet = await PetModel.findByIdAndDelete(id);
            return deletedPet;
        } catch (error) {
            return new InternalError(
                `Error while deleting pet: ${error.message}`
            );
        }
    }
}
