import { NextFunction, Request, Response } from "express";
import { EventRepository } from "../repositories";
import { EventModel } from "../models";

export default class EventController {
    static async getAll(req, res, next) {
        const users = await EventRepository.getAll();

        if (users === undefined) throw new Error("No event available");

        return res.json(users);
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        const user = await EventRepository.get(Number(req.params.id));

        if (user === undefined) throw new Error("Event not found");

        return res.json(user);
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        const foundUser = await EventModel.findOne({
            //where: { email: req.body.email }
        });

        if (foundUser) throw new Error("Event with that email already exits");

        try {
            const createdUser = EventRepository.create({ ...req.body });
            return res.status(201).json(createdUser);
        } catch (error) {
            return next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        const foundUser = await EventModel.findOne({
            where: { id: req.params.id }
        });

        if (!foundUser) throw new Error("Event doesn't exist");

        try {
            const updatedUser = EventRepository.update({
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
        const foundUser = await EventModel.findOne({
            where: { id: req.params.id }
        });

        if (!foundUser) throw new Error("Event doesn't exist");

        try {
            const updatedUser = EventRepository.update({
                id: req.params.id,
                ...req.body
            });
            return res.json(updatedUser);
        } catch (error) {
            return next(error);
        }
    }

    static async destroy(req: Request, res: Response, next: NextFunction) {
        const foundUser = await EventModel.findOne({
            where: { id: req.params.id }
        });

        if (!foundUser) throw new Error("Event doesn't exist");

        try {
            await EventRepository.destroy(Number(req.params.id));
            return res.status(204).json(null);
        } catch (error) {
            return next(error);
        }
    }
}
