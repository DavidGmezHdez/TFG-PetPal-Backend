import { NextFunction, Request, Response } from "express";
import PetRepository from "./pet.repository";
import { NotFoundError, InternalError } from "@utils/errors";

export default class PetController {
    static async getAll(req, res, next) {
        const pets = await PetRepository.getAll();

        if (pets === undefined)
            return next(new NotFoundError(`No pet available`));

        return res.json(pets);
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const pet = await PetRepository.get(id);

        if (pet === undefined) return next(new NotFoundError(`No pet found`));

        return res.json(pet);
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const createdPet = PetRepository.create({ ...req.body });
            return res.status(201).json(createdPet);
        } catch (error) {
            return next(new InternalError(`Error while creating pet`));
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const foundPet = await PetRepository.get(id);

        if (!foundPet) return next(new NotFoundError(`Pet doesn't exist`));

        try {
            const updatedPet = PetRepository.update({
                id: req.params.id,
                ...req.body
            });
            return res.json(updatedPet);
        } catch (error) {
            return next(new InternalError(`Error while updating pet`));
        }
    }

    static async partialUpdate(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const { id } = req.params;
        const foundPet = await PetRepository.get(id);

        if (!foundPet) return next(new NotFoundError(`Pet doesn't exist`));

        try {
            const updatedPet = PetRepository.update({
                id: req.params.id,
                ...req.body
            });
            return res.json(updatedPet);
        } catch (error) {
            return next(new InternalError(`Error while updating pet`));
        }
    }

    static async destroy(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const foundPet = await PetRepository.get(id);

        if (!foundPet) return next(new NotFoundError(`Pet doesn't exist`));

        try {
            await PetRepository.destroy(id);
            return res.status(204).json(null);
        } catch (error) {
            return next(new InternalError(`Error while updating pet`));
        }
    }
}
