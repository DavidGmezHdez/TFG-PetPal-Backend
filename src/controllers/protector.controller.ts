import { NextFunction, Request, Response } from "express";
import { ProtectorRepository } from "../repositories";
import { ProtectorModel } from "../models";

export default class ProtectorController {
    static async getAll(req, res, next) {
        const users = await ProtectorRepository.getAll();

        if (users === undefined) throw new Error("No protector available");

        return res.json(users);
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        const user = await ProtectorRepository.get(Number(req.params.id));

        if (user === undefined) throw new Error("Protector not found");

        return res.json(user);
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        const foundUser = await ProtectorModel.findOne({
            //where: { email: req.body.email }
        });

        if (foundUser)
            throw new Error("Protector with that email already exits");

        try {
            const createdUser = ProtectorRepository.create({ ...req.body });
            return res.status(201).json(createdUser);
        } catch (error) {
            return next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        const foundUser = await ProtectorModel.findOne({
            where: { id: req.params.id }
        });

        if (!foundUser) throw new Error("Protector doesn't exist");

        try {
            const updatedUser = ProtectorRepository.update({
                id: req.params.id,
                ...req.body
            });
            return res.json(updatedUser);
        } catch (error) {
            return next(error);
        }
    }

    static async partialUpdate(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const foundUser = await ProtectorModel.findOne({
            where: { id: req.params.id }
        });

        if (!foundUser) throw new Error("Protector doesn't exist");

        try {
            const updatedUser = ProtectorRepository.update({
                id: req.params.id,
                ...req.body
            });
            return res.json(updatedUser);
        } catch (error) {
            return next(error);
        }
    }

    static async destroy(req: Request, res: Response, next: NextFunction) {
        const foundUser = await ProtectorModel.findOne({
            where: { id: req.params.id }
        });

        if (!foundUser) throw new Error("Protector doesn't exist");

        try {
            await ProtectorRepository.destroy(Number(req.params.id));
            return res.status(204).json(null);
        } catch (error) {
            return next(error);
        }
    }
}
