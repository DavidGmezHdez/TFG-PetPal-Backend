import { NextFunction, Request, Response } from "express";
import ProtectorRepository from "./protector.repository";
import ProtectorModel from "./protector.model";

export default class ProtectorController {
    static async getAll(req, res, next) {
        const protectors = await ProtectorRepository.getAll();

        if (protectors === undefined) throw new Error("No protector available");

        return res.json(protectors);
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        const protector = await ProtectorRepository.get(Number(req.params.id));

        if (protector === undefined) throw new Error("Protector not found");

        return res.json(protector);
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const createdUser = ProtectorRepository.create({ ...req.body });
            return res.status(201).json(createdUser);
        } catch (error) {
            return next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        const foundProtector = await ProtectorRepository.get(
            Number(req.params.id)
        );

        if (!foundProtector) throw new Error("Protector doesn't exist");

        try {
            const updatedProtector = ProtectorRepository.update({
                id: req.params.id,
                ...req.body
            });
            return res.json(updatedProtector);
        } catch (error) {
            return next(error);
        }
    }

    static async partialUpdate(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const foundProtector = await ProtectorRepository.get(
            Number(req.params.id)
        );

        if (!foundProtector) throw new Error("Protector doesn't exist");

        try {
            const updatedProtector = ProtectorRepository.update({
                id: req.params.id,
                ...req.body
            });
            return res.json(updatedProtector);
        } catch (error) {
            return next(error);
        }
    }

    static async destroy(req: Request, res: Response, next: NextFunction) {
        const foundProtector = await ProtectorRepository.get(
            Number(req.params.id)
        );

        if (!foundProtector) throw new Error("Protector doesn't exist");

        try {
            await ProtectorRepository.destroy(Number(req.params.id));
            return res.status(204).json(null);
        } catch (error) {
            return next(error);
        }
    }
}
