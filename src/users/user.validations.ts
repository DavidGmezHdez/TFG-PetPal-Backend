import { Joi } from "express-validation";

const userValidation = {
    create: {
        body: Joi.object({
            name: Joi.string().required(),
            email: Joi.string().required(),
            password: Joi.string().required(),
            posts: Joi.array(),
            pets: Joi.array(),
            hostEvents: Joi.array(),
            attendingEvents: Joi.array()
        })
    },

    update: {
        params: Joi.object({
            id: Joi.number().required()
        }),

        body: Joi.object({
            name: Joi.string(),
            email: Joi.string(),
            password: Joi.string(),
            posts: Joi.array(),
            pets: Joi.array(),
            hostEvents: Joi.array(),
            attendingEvents: Joi.array()
        })
    },

    partialUpdate: {
        params: Joi.object({
            id: Joi.number().required()
        }),

        body: Joi.object({
            name: Joi.string(),
            email: Joi.string(),
            password: Joi.string(),
            posts: Joi.array(),
            pets: Joi.array(),
            hostEvents: Joi.array(),
            attendingEvents: Joi.array()
        })
    }
};

export default userValidation;
