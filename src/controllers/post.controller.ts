import { NextFunction, Request, Response } from "express";
import { PostRepository } from "../repositories";
import { PostModel } from "../models";

export default class PostController {
    static async getAll(req, res, next) {
        const users = await PostRepository.getAll();

        if (users === undefined) throw new Error("No post available");

        return res.json(users);
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        const user = await PostRepository.get(Number(req.params.id));

        if (user === undefined) throw new Error("Post not found");

        return res.json(user);
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        const foundUser = await PostModel.findOne({
            // where: { email: req.body.email }
        });

        if (foundUser) throw new Error("User with that email already exits");

        try {
            const createdUser = PostModel.create({ ...req.body });
            return res.status(201).json(createdUser);
        } catch (error) {
            return next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        const foundUser = await PostModel.findOne({
            where: { id: req.params.id }
        });

        if (!foundUser) throw new Error("Post doesn't exist");

        try {
            const updatedUser = PostRepository.update({
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
        const foundUser = await PostModel.findOne({
            where: { id: req.params.id }
        });

        if (!foundUser) throw new Error("Post doesn't exist");

        try {
            const updatedUser = PostRepository.update({
                id: req.params.id,
                ...req.body
            });
            return res.json(updatedUser);
        } catch (error) {
            return next(error);
        }
    }

    static async destroy(req: Request, res: Response, next: NextFunction) {
        const foundUser = await PostModel.findOne({
            where: { id: req.params.id }
        });

        if (!foundUser) throw new Error("Post doesn't exist");

        try {
            await PostRepository.destroy(Number(req.params.id));
            return res.status(204).json(null);
        } catch (error) {
            return next(error);
        }
    }
}
