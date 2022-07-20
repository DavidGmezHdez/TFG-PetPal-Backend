import { NextFunction, Request, Response } from "express";
import PostRepository from "./post.repository";
import { BadRequest } from "@utils/errors";

export default class PostController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const posts = await PostRepository.getAll();
            return res.status(200).json(posts);
        } catch (error) {
            return next(error);
        }
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            if (!id) throw new BadRequest("No id was provided");
            const post = await PostRepository.get(id);
            return res.status(200).json(post);
        } catch (error) {
            return next(error);
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const createdPost = await PostRepository.create({
                post: req.body,
                image: req.file
            });
            return res.status(201).json(createdPost);
        } catch (error) {
            return next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            if (!id) throw new BadRequest("No id was provided");
            const post = req.body.post;
            const updatedPost = await PostRepository.update({
                id: id,
                ...post
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
            if (!id) throw new BadRequest("No id was provided");
            const post = req.body.post;
            const updatedPost = await PostRepository.update({
                id: id,
                ...post
            });
            return res.json(updatedPost);
        } catch (error) {
            return next(error);
        }
    }

    static async destroy(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            if (!id) throw new BadRequest("No id was provided");
            const deletedEvent = await PostRepository.destroy(id);
            return res.status(200).json(deletedEvent);
        } catch (error) {
            return next(error);
        }
    }

    static async createComment(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { id } = req.params;
            if (!id) throw new BadRequest("No id was provided");
            const comment = req.body.comment;
            const updatedPost = await PostRepository.createComment(id, comment);
            return res.status(200).json(updatedPost);
        } catch (error) {
            return next(error);
        }
    }

    static async destroyComment(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { id } = req.params;
            if (!id) throw new BadRequest("No id was provided");
            const commentId = req.body.commentId;
            const updatedPost = await PostRepository.destroyComment(
                id,
                commentId
            );
            return res.status(200).json(updatedPost);
        } catch (error) {
            return next(error);
        }
    }
}
