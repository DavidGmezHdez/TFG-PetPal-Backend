import { NextFunction, Request, Response } from "express";
import PetRepository from "./pet.repository";

export default class PetController {
    static async getAll(req, res, next) {
        const pets = await PetRepository.getAll();

        if (pets === undefined) throw new Error("No pet available");

        return res.json(pets);
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        const pet = await PetRepository.get(Number(req.params.id));

        if (pet === undefined) throw new Error("Pet not found");

        return res.json(pet);
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const createdPet = PetRepository.create({ ...req.body });
            return res.status(201).json(createdPet);
        } catch (error) {
            return next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        const foundPet = await PetRepository.get(Number(req.params.id));

        if (!foundPet) throw new Error("Pet doesn't exist");

        try {
            const updatedPet = PetRepository.update({
                id: req.params.id,
                ...req.body
            });
            return res.json(updatedPet);
        } catch (error) {
            return next(error);
        }
    }

    static async partialUpdate(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const foundPet = await PetRepository.get(Number(req.params.id));

        if (!foundPet) throw new Error("Pet doesn't exist");

        try {
            const updatedPet = PetRepository.update({
                id: req.params.id,
                ...req.body
            });
            return res.json(updatedPet);
        } catch (error) {
            return next(error);
        }
    }

    static async destroy(req: Request, res: Response, next: NextFunction) {
        const foundPet = await PetRepository.get(Number(req.params.id));

        if (!foundPet) throw new Error("Pet doesn't exist");

        try {
            await PetRepository.destroy(Number(req.params.id));
            return res.status(204).json(null);
        } catch (error) {
            return next(error);
        }
    }
}
