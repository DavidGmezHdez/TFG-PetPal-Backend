import { NextFunction, Request, Response } from "express";
import PetRepository from "./pet.repository";
import { BadRequest } from "@utils/errors";

export default class PetController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const ageSelected = req.query.age as string;
            const ageFixed = PetController.ageFixed(ageSelected);
            const query = ageSelected
                ? {
                      ...req.query,
                      age: ageFixed
                  }
                : { ...req.query };
            const pets = await PetRepository.getByData(query);
            return res.status(200).json(pets);
        } catch (error) {
            return next(error);
        }
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            if (!id) throw new BadRequest("No id was provided");
            const pet = await PetRepository.get(id);
            return res.status(200).json(pet);
        } catch (error) {
            return next(error);
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const createdPet = await PetRepository.create({
                pet: req.body,
                image: req.file
            });
            return res.status(201).json(createdPet);
        } catch (error) {
            return next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            if (!id) throw new BadRequest("No id was provided");
            const pet = req.body.pet;
            const updatedPet = await PetRepository.update({
                id: id,
                ...pet
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
            if (!id) throw new BadRequest("No id was provided");
            const pet = req.body.pet;
            const updatedPet = await PetRepository.update({
                id: id,
                ...pet
            });
            return res.json(updatedPet);
        } catch (error) {
            return next(error);
        }
    }

    static async destroy(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            if (!id) throw new BadRequest("No id was provided");
            const deletedPet = await PetRepository.destroy(id);
            return res.status(200).json(deletedPet);
        } catch (error) {
            return next(error);
        }
    }

    static ageFixed(age: string) {
        switch (age) {
            case "0":
                return { $gte: 0, $lte: 5 };
            case "1":
                return { $gte: 5, $lte: 10 };
            case "2":
                return { $gte: 10, $lte: 15 };
            case "3":
                return { $gte: 15, $lte: 20 };
            default:
                return { $gte: 0, $lte: 20 };
        }
    }
}
