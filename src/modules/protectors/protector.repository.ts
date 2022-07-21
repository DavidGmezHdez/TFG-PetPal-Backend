import { PetModel, PetRepository } from "@modules/pets";
import { PostModel, PostRepository } from "@modules/posts";
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

    static async create({ protector, image }) {
        const foundedProtectorName = await ProtectorModel.findOne({
            name: protector.name
        });

        if (foundedProtectorName)
            throw new InternalError(
                `Error: Ya existe una protectora con ese nombre`
            );

        const foundedUser = await UserModel.findOne({
            email: protector.email
        });

        if (foundedUser)
            throw new InternalError(
                `Error: Ya existe un usuario con ese email`
            );

        const foundedProtectorEmail = await ProtectorModel.findOne({
            email: protector.email
        });
        if (foundedProtectorEmail)
            throw new InternalError(
                `Error: Ya existe una protectora con ese email`
            );

        const s3Result = image
            ? await s3Service.s3UploadV2(image, "protectors")
            : { Location: undefined, Key: undefined };

        const sendProtector = {
            ...protector,
            image: s3Result.Location,
            imageKey: s3Result.Key
        };
        const createdProtector = await ProtectorModel.create(sendProtector);
        return createdProtector;
    }

    static async partialUpdate(protector) {
        const foundedProtectorName = await ProtectorModel.findOne({
            name: protector.name
        });
        const foundedUser = await UserModel.findOne({
            email: protector.email
        });

        const foundedProtectorEmail = await ProtectorModel.findOne({
            email: protector.email
        });

        const differentProtectorName =
            foundedProtectorName &&
            foundedProtectorName._id.toString() !== protector._id;
        const differentUserEmail =
            foundedUser && foundedUser._id.toString() !== protector._id;
        const differentProtectorEmailEmail =
            foundedProtectorEmail &&
            foundedProtectorEmail._id.toString() !== protector._id;

        if (differentProtectorName) {
            throw new InternalError(
                `Error: Ya existe una protectora con ese nombre`
            );
        }

        if (differentUserEmail) {
            throw new InternalError(
                `Error: Ya existe un usuario con ese email`
            );
        }

        if (differentProtectorEmailEmail) {
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
        const deletedProtector = await ProtectorModel.findByIdAndDelete(
            id
        ).lean();
        if (!deletedProtector)
            throw new NotFoundError(`Protector doesn't exist`);

        // DELETE protector's posts
        for (const post of deletedProtector.posts) {
            await PostRepository.destroy(post);
        }

        // DECREMENT posts likes
        for (const likedPost of deletedProtector.likedPosts) {
            await PostModel.findByIdAndUpdate(
                { _id: likedPost },
                { $inc: { likes: -1 } }
            );
        }

        for (const pet of deletedProtector.pets) {
            await PetRepository.destroy(pet);
        }

        if (deletedProtector.imageKey)
            await s3Service.s3DeleteV2(deletedProtector.imageKey);

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
                    id: id,
                    image: s3Result.Location,
                    imageKey: s3Result.Key
                };

                await ProtectorModel.findByIdAndUpdate(
                    { _id: protector.id },
                    { $set: protector },
                    { new: true }
                );
            }
        }
        return foundedProtector;
    }
}
