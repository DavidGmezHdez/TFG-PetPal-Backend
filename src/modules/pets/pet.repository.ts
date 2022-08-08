import { s3Service } from "@utils/s3Service";
import PetModel from "./pet.model";
import { NotFoundError, InternalError } from "@utils/errors";
import { UserModel } from "@modules/users";

export default class PetRepository {
    static async getAll() {
        const pets = await PetModel.find().populate("protector");
        if (!pets.length) throw new NotFoundError(`No pets available`);
        return pets;
    }

    static async get(id: string) {
        const pet = await PetModel.findById(id).populate("protector");
        if (!pet) throw new NotFoundError(`No pet available`);
        return pet;
    }

    static async getByData(data) {
        const pets = await PetModel.find(data).lean().populate("protector");
        if (!pets) throw new NotFoundError(`No se encontraron mascotas `);
        return pets;
    }

    static async create({ pet, images }) {
        const foundedPet = await PetModel.findOne({ name: pet.name });
        if (foundedPet)
            return new InternalError(
                `Error while creating pet: Pet with that name already exists`
            );

        const s3Result = await s3Service.s3UploadMultipleFilesV2(
            images,
            "pets"
        );

        const locations =
            s3Result && s3Result.length
                ? s3Result.map((img) => img.Location)
                : [];
        const keys =
            s3Result && s3Result.length ? s3Result.map((img) => img.Key) : [];

        const sendPet = {
            ...pet,
            image: locations,
            imageKey: keys
        };
        const createdPet = await PetModel.create(sendPet);
        return createdPet;
    }

    static async partialUpdate(pet) {
        const updatedPet = await PetModel.findByIdAndUpdate(
            { _id: pet.id },
            { $set: pet },
            { new: true }
        ).populate("protector");
        if (!updatedPet) throw new NotFoundError(`Pet doesn't exist`);
        return updatedPet;
    }

    static async update(pet) {
        const updatedPet = await PetModel.findByIdAndUpdate(
            { _id: pet.id },
            { $set: pet },
            { new: true }
        ).populate("protector");
        if (!updatedPet) throw new NotFoundError(`Pet doesn't exist`);
        return updatedPet;
    }

    static async destroy(id: string) {
        const deletedPet = await PetModel.findByIdAndDelete(id);
        if (!deletedPet) return new NotFoundError(`Pet doesn't exist`);

        await UserModel.findByIdAndUpdate(
            { _id: deletedPet.protector },
            { $pull: { pets: { $in: [id] } } }
        );

        if (deletedPet.imageKey && deletedPet.imageKey.length)
            await s3Service.s3DeleteMultipleFilesV2(deletedPet.imageKey);
        return deletedPet;
    }
}
