import { NextFunction, Request, Response } from "express";
import PetRepository from "./pet.repository";
import { BadRequest } from "@utils/errors";

export default class PetController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const pets = await PetRepository.getAll();
            return res.status(200).json(pets);
        } catch (error) {
            return next(error);
        }
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            if (!id) return next(new BadRequest("No id was provided"));
            const pet = await PetRepository.get(id);
            return res.status(200).json(pet);
        } catch (error) {
            return next(error);
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const createdPet = await PetRepository.create({ ...req.body });
            return res.status(201).json(createdPet);
        } catch (error) {
            return next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            if (!id) return next(new BadRequest("No id was provided"));
            const updatedPet = await PetRepository.update({
                id: id,
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
        try {
            const { id } = req.params;
            if (!id) return next(new BadRequest("No id was provided"));
            const updatedPet = await PetRepository.update({
                id: id,
                ...req.body
            });
            return res.json(updatedPet);
        } catch (error) {
            return next(error);
        }
    }

    static async destroy(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            if (!id) return next(new BadRequest("No id was provided"));
            const deletedPet = await PetRepository.destroy(id);
            return res.status(204).json(deletedPet);
        } catch (error) {
            return next(error);
        }
    }
}
