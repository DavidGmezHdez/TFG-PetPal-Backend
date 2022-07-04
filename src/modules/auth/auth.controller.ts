import { NextFunction, Request, Response } from "express";
import { BadRequest, NotFoundError } from "@utils/errors";
import { UserRepository } from "@modules/users";
import bcrypt from "bcrypt";
import { ProtectorRepository } from "@modules/protectors";
import jwt from "jsonwebtoken";

export default class AuthController {
    static async registerUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, email, password } = req.body;
            if (!email) throw new BadRequest("No email was provided");
            const encryptedPassword: string = bcrypt.hashSync(password, 10);
            await UserRepository.create({
                name,
                email,
                password: encryptedPassword
            });

            return res.status(201).json({
                success: true,
                msg: "register successful"
            });
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
            const { name, email, password, region, direction, contactPhone } =
                req.body;
            if (!email) throw new BadRequest("No email was provided");
            const encryptedPassword: string = bcrypt.hashSync(password, 10);
            await ProtectorRepository.create({
                name,
                email,
                password: encryptedPassword,
                direction,
                region,
                contactPhone
            });
            return res.status(201).json({
                success: true,
                msg: "register successful"
            });
        } catch (error) {
            return next(error);
        }
    }

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            if (!email || !password)
                throw new BadRequest("Email and password are required");
            const foundedUser = await UserRepository.getByData({ email }, true);
            const foundedProtector = await ProtectorRepository.getByData(
                {
                    email
                },
                true
            );

            console.log({ foundedUser, foundedProtector });

            if (foundedUser) {
                return AuthController.loginUser(
                    { email, password },
                    foundedUser,
                    res,
                    next
                );
            } else if (foundedProtector) {
                return AuthController.loginProtector(
                    { email, password },
                    foundedProtector,
                    res,
                    next
                );
            } else {
                throw new NotFoundError("User with that email doesn't exist");
            }
        } catch (error) {
            return next(error);
        }
    }

    static async loginUser(
        userPetition,
        foundedUser,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { email, password } = userPetition;

            const compare = await bcrypt.compare(
                password,
                foundedUser.password
            );

            if (!compare) {
                throw new NotFoundError("Incorrect email or password");
            }

            const token = jwt.sign({ email: email }, process.env.JWT_SECRET);
            const user = { ...foundedUser, rol: "Usuario", token: token };
            return res.status(200).json({
                success: true,
                msg: "login successful",
                user: user
            });
        } catch (error) {
            return next(error);
        }
    }

    static async loginProtector(
        protectorPetition,
        foundedProtector,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { email, password } = protectorPetition;

            const compare = await bcrypt.compare(
                password,
                foundedProtector.password
            );

            if (!compare) {
                throw new NotFoundError("Incorrect email or password");
            }
            const token = jwt.sign({ email: email }, process.env.JWT_SECRET);
            const user = {
                ...foundedProtector,
                rol: "Protectora",
                token: token
            };
            return res.status(200).json({
                success: true,
                msg: "login successful",
                user: user
            });
        } catch (error) {
            return next(error);
        }
    }
}
