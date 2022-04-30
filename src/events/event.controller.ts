import { NextFunction, Request, Response } from "express";
import EventRepository from "./event.repository";

export default class EventController {
    static async getAll(req, res, next) {
        const events = await EventRepository.getAll();

        if (events === undefined) throw new Error("No event available");

        return res.json(events);
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        const event = await EventRepository.get(Number(req.params.id));

        if (event === undefined) throw new Error("Event not found");

        return res.json(event);
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const createdEvent = EventRepository.create({ ...req.body });
            return res.status(201).json(createdEvent);
        } catch (error) {
            return next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        const foundEvent = await EventRepository.get(Number(req.params.id));

        if (!foundEvent) throw new Error("Event doesn't exist");

        try {
            const updatedEvent = EventRepository.update({
                id: req.params.id,
                ...req.body
            });
            return res.json(updatedEvent);
        } catch (error) {
            return next(error);
        }
    }

    static async partialUpdate(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const foundEvent = await EventRepository.get(Number(req.params.id));

        if (!foundEvent) throw new Error("Event doesn't exist");

        try {
            const updatedEvent = EventRepository.update({
                id: req.params.id,
                ...req.body
            });
            return res.json(updatedEvent);
        } catch (error) {
            return next(error);
        }
    }

    static async destroy(req: Request, res: Response, next: NextFunction) {
        const foundEvent = await EventRepository.get(Number(req.params.id));

        if (!foundEvent) throw new Error("Event doesn't exist");

        try {
            await EventRepository.destroy(Number(req.params.id));
            return res.status(204).json(null);
        } catch (error) {
            return next(error);
        }
    }
}
