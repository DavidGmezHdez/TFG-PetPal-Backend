import { InternalError, NotFoundError } from "@utils/errors";
import ProtectorModel from "./protector.model";

export default class ProtectorRepository {
    static async getAll() {
        const protectors = await ProtectorModel.find();
        if (protectors === undefined)
            throw new NotFoundError(`No protectors available`);
        return protectors;
    }

    static async get(id: string) {
        const protector = await ProtectorModel.findById(id);
        if (protector === undefined)
            throw new NotFoundError(`No protector available`);
        return protector;
    }

    static async getByData(data: any) {
        const protector = await ProtectorModel.findOne(data);
        if (protector === undefined)
            throw new NotFoundError(`No protector available`);
        return protector;
    }

    static async create(protector) {
        const foundedProtectorName = await ProtectorModel.findOne({
            name: protector.name
        });
        if (foundedProtectorName)
            throw new InternalError(
                `Error while creating protector: Protector with that name already exists`
            );
        const foundedProtectorEmail = await ProtectorModel.findOne({
            name: protector.email
        });
        if (foundedProtectorEmail)
            throw new InternalError(
                `Error while creating protector: Protector with that email already exists`
            );
        const createdProtector = await ProtectorModel.create(protector);
        return createdProtector;
    }

    static async partialUpdate(protector) {
        const foundedProtector = await ProtectorModel.findById(protector.id);
        if (!foundedProtector)
            throw new NotFoundError(`Protector doesn't exist`);
        const updatedProtector = await ProtectorModel.findByIdAndUpdate(
            { _id: protector.id },
            { $set: protector },
            { new: true }
        );
        return updatedProtector;
    }

    static async update(protector) {
        const foundedProtector = await ProtectorModel.findById(protector.id);
        if (!foundedProtector)
            throw new NotFoundError(`Protector doesn't exist`);
        const updatedProtector = await ProtectorModel.findByIdAndUpdate(
            { _id: protector.id },
            { $set: protector },
            { new: true }
        );
        return updatedProtector;
    }

    static async destroy(id: string) {
        const foundedProtector = await ProtectorModel.findById(id);
        if (!foundedProtector)
            throw new NotFoundError(`Protector doesn't exist`);
        const deletedProtector = await ProtectorModel.findByIdAndDelete(id);
        return deletedProtector;
    }
}
