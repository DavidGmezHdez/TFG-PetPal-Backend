import { NextFunction, Request, Response } from "express";
import PostRepository from "./post.repository";
import PostModel from "./post.model";
import { InternalError, NotFoundError } from "./../utils/errors";

export default class PostController {
    static async getAll(req, res, next) {
        const posts = await PostRepository.getAll();

        if (posts === undefined)
            return next(new NotFoundError(`No posts available`));

        return res.json(posts);
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const post = await PostRepository.get(id);

        if (post === undefined)
            return next(new NotFoundError(`Post with ${id} not found`));

        return res.json(post);
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const createdPost = await PostModel.create({ ...req.body });
            return res.status(201).json(createdPost);
        } catch (error) {
            return next(new InternalError(`Error while creating post`));
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const foundPost = await PostRepository.get(id);

        if (!foundPost)
            return next(new NotFoundError(`Post with ${id} not found`));

        try {
            const updatedPost = await PostRepository.update({
                id: req.params.id,
                ...req.body
            });
            return res.json(updatedPost);
        } catch (error) {
            return next(new InternalError(`Error while updating post`));
        }
    }

    static async partialUpdate(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const { id } = req.params;
        const foundPost = await PostRepository.get(id);

        if (!foundPost)
            return next(new NotFoundError(`Post with id ${id} not found`));

        try {
            const updatedPost = await PostRepository.update({
                id: req.params.id,
                ...req.body
            });
            return res.json(updatedPost);
        } catch (error) {
            return next(new InternalError(`Error while updating post`));
        }
    }

    static async destroy(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const foundPost = await PostRepository.get(id);

        if (!foundPost)
            return next(new NotFoundError(`Post with id ${id} not found`));

        try {
            await PostRepository.destroy(id);
            return res.status(204).json(null);
        } catch (error) {
            return next(new InternalError(`Error while deleting post`));
        }
    }
}
