import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { ApplicationError, NotFoundError } from "../utils/errors";
import logger from "../utils/logger";

export const handleError = (
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    if (err instanceof ApplicationError) {
        logger.error(err.statusCode, err.stack);
        if (err instanceof NotFoundError) {
            return res.sendStatus(err.statusCode);
        }
        return res
            .status(err.statusCode)
            .json({ code: err.code, message: err.message });
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
};
