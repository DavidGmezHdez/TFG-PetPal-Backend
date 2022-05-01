import { NextFunction, Request, Response } from "express";
import UserRepostory from "./user.repository";
import { NotFoundError, InternalError } from "../../utils/errors";

export default class UserController {
    static async getAll(req, res, next) {
        const users = await UserRepostory.getAll();

        if (users === undefined)
            return next(new NotFoundError(`No user available`));

        return res.json(users);
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const user = await UserRepostory.get(id);

        if (user === undefined)
            return next(new NotFoundError(`User not found`));

        return res.json(user);
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const createdUser = await UserRepostory.create({ ...req.body });
            return res.status(201).json(createdUser);
        } catch (error) {
            return next(new InternalError(`Error while creating user`));
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const foundUser = await UserRepostory.get(id);

        if (!foundUser) return next(new NotFoundError(`User doesn't exist`));

        try {
            const updatedUser = await UserRepostory.update({
                id: req.params.id,
                ...req.body
            });
            return res.json(updatedUser);
        } catch (error) {
            return next(new InternalError(`Error while updating user`));
        }
    }

    static async partialUpdate(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const { id } = req.params;
        const foundUser = await UserRepostory.get(id);

        if (!foundUser) return next(new NotFoundError(`User doesn't exist`));

        try {
            const updatedUser = await UserRepostory.update({
                id: req.params.id,
                ...req.body
            });
            return res.json(updatedUser);
        } catch (error) {
            return next(new InternalError(`Error while updating user`));
        }
    }

    static async destroy(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const foundUser = await UserRepostory.get(id);

        if (!foundUser) return next(new NotFoundError(`User doesn't exist`));

        try {
            await UserRepostory.destroy(id);
            return res.status(204).json(null);
        } catch (error) {
            return next(new InternalError(`Error while deleting user`));
        }
    }
}
