import { NotFoundError, InternalError } from "@utils/errors";
import { NextFunction, Request, Response } from "express";
import ProtectorRepository from "./protector.repository";

export default class ProtectorController {
    static async getAll(req, res, next) {
        const protectors = await ProtectorRepository.getAll();

        if (protectors === undefined)
            return next(new NotFoundError(`No protector found`));

        return res.json(protectors);
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const protector = await ProtectorRepository.get(id);

        if (protector === undefined)
            return next(new NotFoundError(`Protector not found`));

        return res.json(protector);
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const createdUser = await ProtectorRepository.create({
                ...req.body
            });
            return res.status(201).json(createdUser);
        } catch (error) {
            return next(new InternalError(`Error while creating protector`));
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const foundProtector = await ProtectorRepository.get(id);

        if (!foundProtector)
            return next(new NotFoundError(`Protector doesn't found`));

        try {
            const updatedProtector = await ProtectorRepository.update({
                id: req.params.id,
                ...req.body
            });
            return res.json(updatedProtector);
        } catch (error) {
            return next(new InternalError(`Error while updating protector`));
        }
    }

    static async partialUpdate(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const { id } = req.params;
        const foundProtector = await ProtectorRepository.get(id);

        if (!foundProtector)
            return next(new NotFoundError(`Protector doesn't found`));

        try {
            const updatedProtector = await ProtectorRepository.update({
                id: req.params.id,
                ...req.body
            });
            return res.json(updatedProtector);
        } catch (error) {
            return next(new InternalError(`Error while updating protector`));
        }
    }

    static async destroy(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const foundProtector = await ProtectorRepository.get(id);

        if (!foundProtector)
            return next(new NotFoundError(`Protector doesn't found`));

        try {
            await ProtectorRepository.destroy(id);
            return res.status(204).json(null);
        } catch (error) {
            return next(new InternalError(`Error while deleting protector`));
        }
    }
}
