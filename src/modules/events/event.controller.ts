import { InternalError, NotFoundError } from "@utils/errors";
import { NextFunction, Request, Response } from "express";
import EventRepository from "./event.repository";

export default class EventController {
    static async getAll(req, res, next) {
        const events = await EventRepository.getAll();

        if (events === undefined)
            return next(new NotFoundError(`No event available`));

        return res.json(events);
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const event = await EventRepository.get(id);

        if (event === undefined)
            return next(new NotFoundError(`Event not found`));

        return res.json(event);
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const createdEvent = await EventRepository.create({ ...req.body });
            return res.status(201).json(createdEvent);
        } catch (error) {
            return next(new InternalError(`Error while creating event`));
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const foundEvent = await EventRepository.get(id);

        if (!foundEvent) return next(new NotFoundError(`Event doesn't exist`));
        try {
            const updatedEvent = await EventRepository.update({
                id: req.params.id,
                ...req.body
            });
            return res.json(updatedEvent);
        } catch (error) {
            return next(new InternalError(`Error while updating event`));
        }
    }

    static async partialUpdate(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const { id } = req.params;
        const foundEvent = await EventRepository.get(id);

        if (!foundEvent) return next(new NotFoundError(`Event doesn't exist`));

        try {
            const updatedEvent = await EventRepository.update({
                id: req.params.id,
                ...req.body
            });
            return res.json(updatedEvent);
        } catch (error) {
            return next(new InternalError(`Error while updating event`));
        }
    }

    static async destroy(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const foundEvent = await EventRepository.get(id);

        if (!foundEvent) return next(new NotFoundError(`Event doesn't exist`));

        try {
            await EventRepository.destroy(id);
            return res.status(204).json(null);
        } catch (error) {
            return next(new InternalError(`Error while deleting event`));
        }
    }
}
