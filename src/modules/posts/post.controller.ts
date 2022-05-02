import { NextFunction, Request, Response } from "express";
import PostRepository from "./post.repository";
import { BadRequest } from "@utils/errors";

export default class PostController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const posts = await PostRepository.getAll();
            return res.status(200).json(posts);
        } catch (error) {
            next(error);
        }
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            if (!id) return next(new BadRequest("No id was provided"));
            const post = await PostRepository.get(id);
            return res.status(200).json(post);
        } catch (error) {
            next(error);
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const createdPost = await PostRepository.create({ ...req.body });
            return res.status(201).json(createdPost);
        } catch (error) {
            return next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            if (!id) return next(new BadRequest("No id was provided"));
            const updatedPost = await PostRepository.update({
                id: id,
                ...req.body
            });
            return res.json(updatedPost);
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
            if (!id) return next(new BadRequest("No id was provided"));
            const updatedPost = await PostRepository.update({
                id: id,
                ...req.body
            });
            return res.json(updatedPost);
        } catch (error) {
            return next(error);
        }
    }

    static async destroy(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            if (!id) return next(new BadRequest("No id was provided"));
            const deletedPost = await PostRepository.destroy(id);
            return res.status(204).json(deletedPost);
        } catch (error) {
            return next(error);
        }
    }
}
