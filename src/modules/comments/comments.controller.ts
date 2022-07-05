import { BadRequest } from "@utils/errors";
import { NextFunction, Request, Response } from "express";
import CommentRepository from "./comments.repository";

export default class CommentController {
    static async getAll(req, res, next) {
        try {
            const coments = await CommentRepository.getAll();
            return res.status(200).json(coments);
        } catch (error) {
            return next(error);
        }
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            if (!id) throw new BadRequest("No id was provided");
            const comment = await CommentRepository.get(id);
            return res.status(200).json(comment);
        } catch (error) {
            return next(error);
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const comment = req.body.comment;
            const createdComment = await CommentRepository.create({
                ...comment
            });
            return res.status(201).json(createdComment);
        } catch (error) {
            return next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            if (!id) throw new BadRequest("No id was provided");
            const comment = req.body.comment;
            const updatedComment = await CommentRepository.update({
                id: id,
                ...comment
            });
            return res.json(updatedComment);
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
            const comment = req.body.comment;
            const updatedComment = await CommentRepository.update({
                id: id,
                ...comment
            });
            return res.json(updatedComment);
        } catch (error) {
            return next(error);
        }
    }

    static async destroy(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            if (!id) throw new BadRequest("No id was provided");
            const deletedComment = await CommentRepository.destroy(id);
            return res.status(200).json(deletedComment);
        } catch (error) {
            return next(error);
        }
    }
}
