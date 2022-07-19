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
        if (foundedProtectorName) {
            await s3Service.s3DeleteV2(protector.imageKey);
            throw new InternalError(
                `Error: Ya existe una protectora con ese nombre`
            );
        }

        if (foundedUser) {
            await s3Service.s3DeleteV2(protector.imageKey);
            throw new InternalError(
                `Error: Ya existe un usuario con ese nombre`
            );
        }

        const foundedProtectorEmail = await ProtectorModel.findOne({
            email: protector.email
        });
        if (foundedProtectorEmail) {
            await s3Service.s3DeleteV2(protector.imageKey);
            throw new InternalError(
                `Error: Ya existe una protectora con ese email`
            );
        }

        const createdProtector = await ProtectorModel.create(protector);
        return createdProtector;
    }

    static async partialUpdate(protector) {
        const foundedProtectorName = await ProtectorModel.findOne({
            name: protector.name
        });
        const foundedUser = await UserModel.findOne({
            email: protector.email
        });
        if (foundedProtectorName) {
            throw new InternalError(
                `Error: Ya existe una protectora con ese nombre`
            );
        }

        if (foundedUser) {
            throw new InternalError(
                `Error: Ya existe un usuario con ese nombre`
            );
        }
        const foundedProtectorEmail = await ProtectorModel.findOne({
            email: protector.email
        });
        if (foundedProtectorEmail) {
            throw new InternalError(
                `Error: Ya existe una protectora con ese email`
            );
        }

        // Will need to update, then update pets region and later return
        await ProtectorModel.findByIdAndUpdate(
            { _id: protector.id },
            { $set: protector },
            { new: true }
        );
        await PetModel.updateMany(
            { _id: { $in: protector.pets } },
            { $set: { region: protector.region } },
            { multi: true }
        );

        const foundedProtector = await ProtectorModel.findById(protector.id)
            .lean()
            .populate("posts")
            .populate("pets");

        return foundedProtector;
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
        const foundedProtector = await ProtectorModel.findById(id).lean();
        if (!foundedProtector)
            throw new NotFoundError(`Protector doesn't exist`);
        if (foundedProtector.imageKey)
            await s3Service.s3DeleteV2(foundedProtector.imageKey);
        const deletedProtector = await ProtectorModel.findByIdAndDelete(
            id
        ).lean();
        return deletedProtector;
    }

    static async updateImage(id: string, image) {
        const foundedProtector = await ProtectorModel.findById(id).lean();
        if (!foundedProtector)
            throw new NotFoundError(`Protector doesn't exist`);
        // If the protector doesn't have an image we must upload it
        if (image) {
            if (foundedProtector.imageKey) {
                await s3Service.s3UpdateV2(foundedProtector.imageKey, image);
            } else {
                const s3Result = image
                    ? await s3Service.s3UploadV2(image, "pets")
                    : { Location: undefined, Key: undefined };
                const protector = {
                    image: s3Result.Location,
                    imageKey: s3Result.Key
                };

                await ProtectorRepository.partialUpdate({ protector });
            }
        }
        return foundedProtector;
    }
}
