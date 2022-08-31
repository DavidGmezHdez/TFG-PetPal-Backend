import { EventModel, EventRepository } from "@modules/events";
import { PostModel, PostRepository } from "@modules/posts";
import { ProtectorModel } from "@modules/protectors";
import { InternalError, NotFoundError } from "@utils/errors";
import { s3Service } from "@utils/s3Service";
import UserModel from "./user.model";

export default class UserRepository {
    static async getAll() {
        const users = await UserModel.find()
            .lean()
            .populate("posts")
            .populate("hostEvents")
            .populate("attendingEvents");
        if (!users.length) throw new NotFoundError(`No users available`);
        return users;
    }

    static async get(id: string) {
        const user = await UserModel.findById(id)
            .lean()
            .populate("posts")
            .populate("hostEvents")
            .populate("attendingEvents");

        if (!user) throw new NotFoundError(`No user available`);
        return user;
    }

    static async getByData(data: any, login: boolean) {
        const user = await UserModel.findOne(data)
            .lean()
            .populate("posts")
            .populate("hostEvents")
            .populate("attendingEvents");
        if (!user && !login)
            throw new NotFoundError(
                `No se ha encontrado un usuario con estos datos `
            );
        return user;
    }

    static async create({ user, image }) {
        const foundUser = await UserModel.findOne({ email: user.email });
        const foundProtector = await ProtectorModel.findOne({
            email: user.email
        });
        if (foundUser || foundProtector)
            throw new InternalError("Ya existe un usuario con ese email");

        const s3Result = image
            ? await s3Service.s3UploadV2(image, "users")
            : { Location: undefined, Key: undefined };
        const sendUser = {
            ...user,
            image: s3Result.Location,
            imageKey: s3Result.Key
        };
        const createdUser = await UserModel.create(sendUser);
        return createdUser;
    }

    static async partialUpdate(user) {
        const foundUser = await UserModel.findOne({
            email: user.email
        }).lean();
        const foundProtector = await ProtectorModel.findOne({
            email: user.email
        }).lean();

        const differentUser = foundUser && user.id !== foundUser._id.toString();
        const differentProtector =
            foundProtector && user.id !== foundProtector._id.toString();

        if (differentUser || differentProtector)
            throw new InternalError("Ya existe un usuario con ese email");

        const updatedUser = await UserModel.findByIdAndUpdate(
            { _id: user.id },
            { $set: user },
            { new: true }
        )
            .lean()
            .populate("posts")
            .populate("hostEvents");
        if (!updatedUser) throw new NotFoundError(`User doesn't exist`);
        return updatedUser;
    }

    static async update(user) {
        const updatedUser = await UserModel.findByIdAndUpdate(
            { _id: user.id },
            { $set: user },
            { new: true }
        )
            .lean()
            .populate("posts")
            .populate("hostEvents");
        if (!updatedUser) throw new NotFoundError(`User doesn't exist`);
        return updatedUser;
    }

    static async destroy(id: string) {
        const deletedUser = await UserModel.findByIdAndDelete(id).lean();
        if (!deletedUser) throw new NotFoundError(`User doesn't exist`);

        // DELETE user's posts
        for (const post of deletedUser.posts) {
            await PostRepository.destroy(post);
        }

        // DELETE user's host events
        for (const event of deletedUser.hostEvents) {
            await EventRepository.destroy(event);
        }

        // DELETE event's attendants
        await EventModel.updateMany(
            { attendants: { $elemMatch: { $eq: id } } },
            { $pull: { attendants: { $in: [id] } } }
        );

        // DECREMENT posts likes
        for (const likedPost of deletedUser.likedPosts) {
            await PostModel.findByIdAndUpdate(
                { _id: likedPost },
                { $inc: { likes: -1 } }
            );
        }

        if (deletedUser.imageKey)
            await s3Service.s3DeleteV2(deletedUser.imageKey);
        return deletedUser;
    }

    static async updateImage(id: string, image) {
        const foundedUser = await UserModel.findById(id).lean();
        if (!foundedUser) throw new NotFoundError(`No existe el usuario`);
        // If the protector doesn't have an image we must upload it
        if (image) {
            if (foundedUser.imageKey) {
                await s3Service.s3UpdateV2(foundedUser.imageKey, image);
            } else {
                const s3Result = image
                    ? await s3Service.s3UploadV2(image, "users")
                    : { Location: undefined, Key: undefined };
                const user = {
                    id: id,
                    image: s3Result.Location,
                    imageKey: s3Result.Key
                };

                return await UserModel.findByIdAndUpdate(
                    { _id: user.id },
                    { $set: user },
                    { new: true }
                );
            }
        }
        return foundedUser;
    }
}
