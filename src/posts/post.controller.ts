import { NextFunction, Request, Response } from "express";
import PostRepository from "./post.repository";
import PostModel from "./post.model";

export default class PostController {
    static async getAll(req, res, next) {
        const posts = await PostRepository.getAll();

        if (posts === undefined) throw new Error("No post available");

        return res.json(posts);
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        const post = await PostRepository.get(Number(req.params.id));

        if (post === undefined) throw new Error("Post not found");

        return res.json(post);
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const createdPost = PostModel.create({ ...req.body });
            return res.status(201).json(createdPost);
        } catch (error) {
            return next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        const foundPost = await PostRepository.get(Number(req.params.id));

        if (!foundPost) throw new Error("Post doesn't exist");

        try {
            const updatedPost = PostRepository.update({
                id: req.params.id,
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
        const foundPost = await PostRepository.get(Number(req.params.id));

        if (!foundPost) throw new Error("Post doesn't exist");

        try {
            const updatedPost = PostRepository.update({
                id: req.params.id,
                ...req.body
            });
            return res.json(updatedPost);
        } catch (error) {
            return next(error);
        }
    }

    static async destroy(req: Request, res: Response, next: NextFunction) {
        const foundPost = await PostRepository.get(Number(req.params.id));

        if (!foundPost) throw new Error("Post doesn't exist");

        try {
            await PostRepository.destroy(Number(req.params.id));
            return res.status(204).json(null);
        } catch (error) {
            return next(error);
        }
    }
}
