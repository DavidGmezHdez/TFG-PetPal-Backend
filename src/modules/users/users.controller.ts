import { NextFunction, Request, Response } from "express";
import UserRepostory from "./user.repository";
import { BadRequest } from "@utils/errors";
import bcrypt from "bcrypt";

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
            const user = req.body.user;
            const updatedUser = await UserRepostory.update({
                id: id,
                ...user
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
            const user = req.body.user;
            const foundedUser = await UserRepostory.get(id);
            const password = req.body.user.password;
            const encryptedPassword = password
                ? await UserController.changePassword(password, foundedUser)
                : foundedUser.password;
            const finalUser = { ...user, password: encryptedPassword };
            const updatedUser = await UserRepostory.partialUpdate({
                id: id,
                ...finalUser
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
            return res.status(200).json(deletedUser);
        } catch (error) {
            return next(error);
        }
    }

    static async imageUpdate(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            if (!id) throw new BadRequest("No id was provided");
            const image = req.file;
            const updatedUser = await UserRepostory.updateImage(id, image);
            return res.status(200).json(updatedUser);
        } catch (error) {
            return next(error);
        }
    }

    static async changePassword(password, foundedUser) {
        const compare = await bcrypt.compare(password, foundedUser.password);
        // If user passwords are different that means that the user wants to change the password of their account
        if (!compare) {
            return bcrypt.hashSync(password, 10);
        } else {
            return foundedUser.password;
        }
    }
}
