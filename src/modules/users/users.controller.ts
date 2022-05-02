import { NextFunction, Request, Response } from "express";
import UserRepostory from "./user.repository";
import { BadRequest } from "@utils/errors";

export default class UserController {
    static async getAll(req, res, next) {
        try {
            const users = await UserRepostory.getAll();
            return res.status(200).json(users);
        } catch (error) {
            return next(error);
        }
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            if (!id) throw new BadRequest("No id was provided");
            const user = await UserRepostory.get(id);
            return res.status(200).json(user);
        } catch (error) {
            return next(error);
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const createdUser = await UserRepostory.create({ ...req.body });
            return res.status(201).json(createdUser);
        } catch (error) {
            return next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            if (!id) throw new BadRequest("No id was provided");
            const updatedUser = await UserRepostory.update({
                id: id,
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
        try {
            const { id } = req.params;
            if (!id) throw new BadRequest("No id was provided");
            const updatedUser = await UserRepostory.update({
                id: id,
                ...req.body
            });
            return res.json(updatedUser);
        } catch (error) {
            return next(error);
        }
    }

    static async destroy(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            if (!id) throw new BadRequest("No id was provided");
            const deletedUser = await UserRepostory.destroy(id);
            return res.status(204).json(deletedUser);
        } catch (error) {
            return next(error);
        }
    }
}
