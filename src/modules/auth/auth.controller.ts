import { NextFunction, Request, Response } from "express";
import { BadRequest, NotFoundError } from "@utils/errors";
import { UserRepository } from "@modules/users";
import bcrypt from "bcrypt";
import { ProtectorRepository } from "@modules/protectors";
import jwt from "jsonwebtoken";

export default class AuthController {
    static async registerUser(req: Request, res: Response, next: NextFunction) {
        console.log("AAAAA");
        try {
            const { name, email, password } = req.body;
            if (!email) throw new BadRequest("No email was provided");
            const encryptedPassword = bcrypt.hashSync(password, 10);
            const createdUser = await UserRepository.create({
                name,
                email,
                encryptedPassword
            });
            return res.status(201).json(createdUser);
        } catch (error) {
            return next(error);
        }
    }

    static async registerProtector(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { name, email, password } = req.body;
            if (!email) throw new BadRequest("No email was provided");
            const encryptedPassword = bcrypt.hashSync(password, 10);
            const createdProtector = await ProtectorRepository.create({
                name,
                email,
                encryptedPassword
            });
            return res.status(201).json(createdProtector);
        } catch (error) {
            return next(error);
        }
    }

    static async loginUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            if (!email || !password)
                throw new BadRequest("Email and password are required");
            const foundedUser = await UserRepository.getByData({ email });
            const compare = await bcrypt.compare(
                password,
                foundedUser.password
            );
            if (!compare) {
                throw new NotFoundError("Incorrect email or password");
            }
            const token = jwt.sign({ email: email }, process.env.JWT_SECRET);
            return res
                .status(200)
                .json({ success: true, msg: "login successful", token: token });
        } catch (error) {
            return next(error);
        }
    }

    static async loginProtector(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { email, password } = req.body;
            if (!email || !password)
                throw new BadRequest("Email and password are required");

            const foundedProtector = await ProtectorRepository.getByData({
                email
            });

            const compare = await bcrypt.compare(
                password,
                foundedProtector.password
            );

            if (!compare) {
                throw new NotFoundError("Incorrect email or password");
            }
            const token = jwt.sign({ email: email }, process.env.JWT_SECRET);
            return res
                .status(200)
                .json({ success: true, msg: "login successful", token: token });
        } catch (error) {
            return next(error);
        }
    }
}
