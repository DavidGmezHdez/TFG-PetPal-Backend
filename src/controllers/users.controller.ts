import { NextFunction, Request, Response } from "express";
import { UserRepostory } from "../repositories";

export default class UserController {
    static async getAll(req, res, next) {
        console.log("test");
    }

    static async get(req: Request, res: Response, next: NextFunction) {}

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
        } catch (error) {
            return next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
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
        } catch (error) {
            return next(error);
        }
    }

    static async destroy(req: Request, res: Response, next: NextFunction) {
        try {
            await UserRepostory.destroy(Number(req.params.id));
            return res.status(204).json(null);
        } catch (error) {
            return next(error);
        }
    }
}
