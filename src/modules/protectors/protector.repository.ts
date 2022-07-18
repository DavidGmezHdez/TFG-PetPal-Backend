import { PetModel } from "@modules/pets";
import { UserModel } from "@modules/users";
import { InternalError, NotFoundError } from "@utils/errors";
import { s3Service } from "@utils/s3Service";
import ProtectorModel from "./protector.model";

export default class ProtectorRepository {
    static async getAll() {
        const protectors = await ProtectorModel.find().lean();
        if (protectors === undefined)
            throw new NotFoundError(`No protectors available`);
        return protectors;
    }

    static async get(id: string) {
        const protector = await ProtectorModel.findById(id)
            .lean()
            .populate("posts")
            .populate("pets");
        if (protector === undefined)
            throw new NotFoundError(`No protector available`);
        return protector;
    }

    static async getByData(data: any, login: boolean) {
        const protector = await ProtectorModel.findOne(data)
            .lean()
            .populate("posts")
            .populate("pets");
        if (!protector && !login)
            throw new NotFoundError(
                `No se ha encontrado una protectora con estos datos`
            );
        return protector;
    }

    static async create(protector) {
        const foundedProtectorName = await ProtectorModel.findOne({
            name: protector.name
        });
        const foundedUser = await UserModel.findOne({
            email: protector.email
        });
        if (foundedProtectorName)
            throw new InternalError(
                `Error: Ya existe una protectora con ese nombre`
            );
        if (foundedUser)
            throw new InternalError(
                `Error: Ya existe un usuario con ese nombre`
            );
        const foundedProtectorEmail = await ProtectorModel.findOne({
            name: protector.email
        });
        if (foundedProtectorEmail)
            throw new InternalError(
                `Error: Ya existe una protectora con ese email`
            );
        const createdProtector = await ProtectorModel.create(protector);
        return createdProtector;
    }

    static async partialUpdate(protector) {
        console.log("PROTECTOR", protector);

        // We must update the region of the pets the protector has

        const foundedProtector = await ProtectorModel.findById(protector._id);
        await PetModel.updateMany(
            { _id: { $in: foundedProtector.pets } },
            { $set: { region: protector.region } },
            { multi: true }
        );

        const updatedProtector = await ProtectorModel.findByIdAndUpdate(
            { _id: protector.id },
            { $set: protector },
            { new: true }
        )
            .lean()
            .populate("posts")
            .populate("pets");
        console.log("UPDATED PROTECTOR", updatedProtector);
        return updatedProtector;
    }

    static async update(protector) {
        const foundedProtector = await ProtectorModel.findById(protector.id);
        if (!foundedProtector)
            throw new NotFoundError(`Protector doesn't exist`);
        const updatedProtector = await ProtectorModel.findByIdAndUpdate(
            { _id: protector.id }, //
            { $set: protector },
            { new: true }
        )
            .lean()
            .populate("posts")
            .populate("pets");
        return updatedProtector;
    }

    static async destroy(id: string) {
        const foundedProtector = await ProtectorModel.findById(id);
        if (!foundedProtector)
            throw new NotFoundError(`Protector doesn't exist`);
        const deletedProtector = await ProtectorModel.findByIdAndDelete(
            id
        ).lean();
        return deletedProtector;
    }

    static async updateImage(id: string, image) {
        const foundedProtector = await ProtectorModel.findById(id).lean();
        if (!foundedProtector)
            throw new NotFoundError(`Protector doesn't exist`);
        if (!foundedProtector)
            throw new NotFoundError(`Protector doesn't exist`);

        console.log(foundedProtector.imageKey);
        if (image) {
            await s3Service.s3UpdateV2(image, foundedProtector.imageKey);
        }
        return foundedProtector;
    }
}
