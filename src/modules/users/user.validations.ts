import { Joi } from "express-validation";

const userValidation = {
    create: {
        body: Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            posts: Joi.array().optional(),
            pets: Joi.array().optional(),
            hostEvents: Joi.array().optional(),
            attendingEvents: Joi.array().optional()
        })
    },

    update: {
        params: Joi.object({
            id: Joi.string().required()
        }),

        body: Joi.object({
            name: Joi.string().optional(),
            email: Joi.string().email().optional(),
            password: Joi.string().optional(),
            posts: Joi.array().optional(),
            pets: Joi.array().optional(),
            hostEvents: Joi.array().optional(),
            attendingEvents: Joi.array().optional()
        })
    },

    partialUpdate: {
        params: Joi.object({
            id: Joi.string().required()
        }),

        body: Joi.object({
            name: Joi.string().optional(),
            email: Joi.string().email().optional(),
            password: Joi.string().optional(),
            posts: Joi.array().optional(),
            pets: Joi.array().optional(),
            hostEvents: Joi.array().optional(),
            attendingEvents: Joi.array().optional()
        })
    }
};

export default userValidation;
