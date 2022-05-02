import { NotFoundError, InternalError, BadRequest } from "@utils/errors";
import { NextFunction, Request, Response } from "express";
import ProtectorRepository from "./protector.repository";

export default class ProtectorController {
    static async getAll(req, res, next) {
        try {
            const protectors = await ProtectorRepository.getAll();
            return res.status(200).json(protectors);
        } catch (error) {
            return next(error);
        }
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            if (!id) throw new BadRequest("No id was provided");
            const protector = await ProtectorRepository.get(id);
            return res.status(200).json(protector);
        } catch (error) {
            return next(error);
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const createdProtector = await ProtectorRepository.create({
                ...req.body
            });
            return res.status(201).json(createdProtector);
        } catch (error) {
            return next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            if (!id) throw new BadRequest("No id was provided");
            const updatedProtector = await ProtectorRepository.update({
                id: id,
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
        try {
            const { id } = req.params;
            if (!id) throw new BadRequest("No id was provided");
            const updatedProtector = await ProtectorRepository.update({
                id: id,
                ...req.body
            });
            return res.json(updatedProtector);
        } catch (error) {
            return next(error);
        }
    }

    static async destroy(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            if (!id) throw new BadRequest("No id was provided");
            const deletedProtector = await ProtectorRepository.destroy(id);
            return res.status(204).json(deletedProtector);
        } catch (error) {
            return next(error);
        }
    }
}
