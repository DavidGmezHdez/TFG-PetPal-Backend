import { NextFunction, Request, Response } from "express";
import { PetRepository } from "../repositories";
import { PetModel } from "../models";

export default class PetController {
    static async getAll(req, res, next) {
        const users = await PetRepository.getAll();

        if (users === undefined) throw new Error("No pet available");

        return res.json(users);
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        const user = await PetRepository.get(Number(req.params.id));

        if (user === undefined) throw new Error("Pet not found");

        return res.json(user);
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        const foundUser = await PetModel.findOne({
            //where: { email: req.body.email }
        });

        if (foundUser) throw new Error("Pet with that email already exits");

        try {
            const createdUser = PetRepository.create({ ...req.body });
            return res.status(201).json(createdUser);
        } catch (error) {
            return next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        const foundUser = await PetModel.findOne({
            where: { id: req.params.id }
        });

        if (!foundUser) throw new Error("Pet doesn't exist");

        try {
            const updatedUser = PetRepository.update({
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
        const foundUser = await PetModel.findOne({
            where: { id: req.params.id }
        });

        if (!foundUser) throw new Error("Pet doesn't exist");

        try {
            const updatedUser = PetRepository.update({
                id: req.params.id,
                ...req.body
            });
            return res.json(updatedUser);
        } catch (error) {
            return next(error);
        }
    }

    static async destroy(req: Request, res: Response, next: NextFunction) {
        const foundUser = await PetModel.findOne({
            where: { id: req.params.id }
        });

        if (!foundUser) throw new Error("Pet doesn't exist");

        try {
            await PetRepository.destroy(Number(req.params.id));
            return res.status(204).json(null);
        } catch (error) {
            return next(error);
        }
    }
}
