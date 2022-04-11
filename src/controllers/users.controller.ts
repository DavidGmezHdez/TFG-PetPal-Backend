import { NextFunction, Request, Response } from "express";
import { UserRepostory } from "../repositories";
import { UserModel } from "../models";

export default class UserController {
    static async getAll(req, res, next) {
        const users = await UserRepostory.getAll();

        if (users === undefined)
            throw new Error("No user available")

        return res.json(users);
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        const user = await UserRepostory.get(Number(req.params.id));

        if (user === undefined)
            throw new Error("User not found")

        return res.json(user);
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        const foundUser = await UserModel.findOne({
            where: { email: req.body.email },
        });

        if (foundUser)
            throw new Error("User with that email already exits");

        try {
            const createdUser = UserRepostory.create({ ...req.body });
            return res.status(201).json(createdUser)
        } catch (error) {
            return next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        const foundUser = await UserModel.findOne({
            where: { id: req.params.id },
        });

        if (!foundUser)
            throw new Error("User doesn't exist");

        try {
            const updatedUser = UserRepostory.update({ id: req.params.id, ...req.body });
            return res.json(updatedUser)
        } catch (error) {
            return next(error);
        }
    }

    static async partialUpdate(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const foundUser = await UserModel.findOne({
            where: { id: req.params.id },
        });

        if (!foundUser)
            throw new Error("User doesn't exist");

        try {
            const updatedUser = UserRepostory.update({ id: req.params.id, ...req.body });
            return res.json(updatedUser)
        } catch (error) {
            return next(error);
        }
    }

    static async destroy(req: Request, res: Response, next: NextFunction) {
        const foundUser = await UserModel.findOne({
            where: { id: req.params.id },
        });

        if (!foundUser)
            throw new Error("User doesn't exist");

        try {
            await UserRepostory.destroy(Number(req.params.id));
            return res.status(204).json(null);
        } catch (error) {
            return next(error);
        }
    }
}
