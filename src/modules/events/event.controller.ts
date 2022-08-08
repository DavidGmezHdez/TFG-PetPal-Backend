import { BadRequest } from "@utils/errors";
import { NextFunction, Request, Response } from "express";
import EventRepository from "./event.repository";

export default class EventController {
    static async getAll(req, res, next) {
        try {
            console.log(req.query);
            const data = { ...req.query, date: { $gt: Date.now() } };
            const events = req.query
                ? await EventRepository.getByData(data)
                : await EventRepository.getAll();
            console.log("EVENTS", events);
            return res.status(200).json(events);
        } catch (error) {
            return next(error);
        }
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            if (!id) throw new BadRequest("No id was provided");
            const event = await EventRepository.get(id);
            return res.status(200).json(event);
        } catch (error) {
            return next(error);
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const event = req.body.event;
            const createdEvent = await EventRepository.create({ ...event });
            return res.status(201).json(createdEvent);
        } catch (error) {
            return next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            if (!id) throw new BadRequest("No id was provided");
            const event = req.body.event;
            const updatedEvent = await EventRepository.update({
                id: id,
                ...event
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
        try {
            const { id } = req.params;
            if (!id) throw new BadRequest("No id was provided");
            const event = req.body.event;
            const updatedEvent = await EventRepository.partialUpdate({
                id: id,
                ...event
            });
            return res.json(updatedEvent);
        } catch (error) {
            return next(error);
        }
    }

    static async destroy(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            if (!id) throw new BadRequest("No id was provided");
            const deletedEvent = await EventRepository.destroy(id);
            return res.status(200).json(deletedEvent);
        } catch (error) {
            return next(error);
        }
    }
}
