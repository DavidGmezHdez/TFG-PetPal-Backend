import { InternalError, NotFoundError } from "@utils/errors";
import ProtectorModel from "./protector.model";

export default class ProtectorRepository {
    static async getAll() {
        const protectors = await ProtectorModel.find();
        if (protectors === undefined)
            return new NotFoundError(`No protectors available`);
        return protectors;
    }

    static async get(id: string) {
        const protector = await ProtectorModel.findById(id);
        if (protector === undefined)
            return new NotFoundError(`No protector available`);
        return protector;
    }

    static async create(protector) {
        try {
            const foundedProtector = await ProtectorModel.findOne({
                name: protector.name
            });
            if (foundedProtector)
                return new InternalError(
                    `Error while creating protector: Protector with that name already exists`
                );
            const createdProtector = await ProtectorModel.create(protector);
            return createdProtector;
        } catch (error) {
            return new InternalError(
                `Error while creating protector: ${error.message}`
            );
        }
    }

    static async partialUpdate(protector) {
        try {
            const foundedProtector = await ProtectorModel.findById(
                protector.id
            );
            if (!foundedProtector)
                return new NotFoundError(`Protector doesn't exist`);
            const updatedProtector = await ProtectorModel.findByIdAndUpdate(
                { _id: protector.id },
                { $set: protector },
                { new: true }
            );
            return updatedProtector;
        } catch (error) {
            return new InternalError(
                `Error while updating protector: ${error.message}`
            );
        }
    }

    static async update(protector) {
        try {
            const foundedProtector = await ProtectorModel.findById(
                protector.id
            );
            if (!foundedProtector)
                return new NotFoundError(`Protector doesn't exist`);
            const updatedProtector = await ProtectorModel.findByIdAndUpdate(
                { _id: protector.id },
                { $set: protector },
                { new: true }
            );
            return updatedProtector;
        } catch (error) {
            return new InternalError(
                `Error while updating protector: ${error.message}`
            );
        }
    }

    static async destroy(id: string) {
        try {
            const foundedProtector = await ProtectorModel.findById(id);
            if (!foundedProtector)
                return new NotFoundError(`Protector doesn't exist`);
            const deletedProtector = await ProtectorModel.findByIdAndDelete(id);
            return deletedProtector;
        } catch (error) {
            return new InternalError(
                `Error while deleting protector: ${error.message}`
            );
        }
    }
}
