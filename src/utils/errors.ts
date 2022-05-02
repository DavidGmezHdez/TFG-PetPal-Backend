import httpStatus from "http-status";

export class ApplicationError extends Error {
    public statusCode: number;
    public code: string;

    constructor(statusCode: number, code: string, message) {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
    }
}

export class NotFoundError extends ApplicationError {
    constructor(message) {
        super(httpStatus.NOT_FOUND, "not-found", message);
    }
}

export class BadRequest extends ApplicationError {
    constructor(message) {
        super(httpStatus.BAD_REQUEST, "bad-request", message);
    }
}

export class InternalError extends ApplicationError {
    constructor(message) {
        super(
            httpStatus.INTERNAL_SERVER_ERROR,
            "internal-server-error",
            message
        );
    }
}
