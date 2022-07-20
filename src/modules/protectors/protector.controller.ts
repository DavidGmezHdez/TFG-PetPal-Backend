import { BadRequest } from "@utils/errors";
import { NextFunction, Request, Response } from "express";
import ProtectorRepository from "./protector.repository";
import bcrypt from "bcrypt";

export default class ProtectorController {
    static async getAll(req, res, next) {
        try {
            const protectors = await ProtectorRepository.getAll();
            return res.status(200).json(protectors);
        } catch (error) {
            return next(error);
        }
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            if (!id) throw new BadRequest("No id was provided");
            const protector = await ProtectorRepository.get(id);
            return res.status(200).json(protector);
        } catch (error) {
            return next(error);
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const createdProtector = await ProtectorRepository.create({
                ...req.body
            });
            return res.status(201).json(createdProtector);
        } catch (error) {
            return next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            if (!id)
                throw new BadRequest(
                    "No se ha enviado ningún id relacionado con algún usuario"
                );
            const protector = req.body.protector;
            const updatedProtector = await ProtectorRepository.update({
                id: id,
                ...protector
            });
            return res.json(updatedProtector);
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
            if (!id)
                throw new BadRequest(
                    "No se ha enviado ningún id relacionado con algún usuario"
                );
            const protector = req.body.protector;
            const password = req.body.protector.password;
            const foundedProtector = await ProtectorRepository.get(id);

            const encryptedPassword = password
                ? await ProtectorController.changePassword(
                      password,
                      foundedProtector
                  )
                : foundedProtector.password;

            const finalProtector = {
                ...protector,
                password: encryptedPassword
            };
            const updatedProtector = await ProtectorRepository.partialUpdate({
                id: id,
                ...finalProtector
            });
            return res.json(updatedProtector);
        } catch (error) {
            return next(error);
        }
    }

    static async destroy(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            if (!id) throw new BadRequest("No id was provided");
            const deletedProtector = await ProtectorRepository.destroy(id);
            return res.status(204).json(deletedProtector);
        } catch (error) {
            return next(error);
        }
    }

    static async imageUpdate(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            if (!id) throw new BadRequest("No id was provided");
            const image = req.file;
            
            const updatedProtector = await ProtectorRepository.updateImage(
                id,
                image
            );
            return res.status(200).json(updatedProtector);
        } catch (error) {
            return next(error);
        }
    }

    static async changePassword(password, foundedProtector) {
        const compare = await bcrypt.compare(
            password,
            foundedProtector.password
        );

        // If protector passwords are different that means that the user wants to change the password of their account
        if (!compare) {
            return await bcrypt.hashSync(password, 10);
        } else {
            return foundedProtector.password;
        }
    }
}
