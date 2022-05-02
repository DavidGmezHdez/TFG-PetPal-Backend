import { Joi } from "express-validation";

const eventValidation = {
    create: {
        body: Joi.object({
            date: Joi.date().required(),
            host: Joi.string().required(),
            price: Joi.number(),
            place: Joi.string().required(),
            title: Joi.string().required(),
            description: Joi.string().required(),
            image: Joi.string()
        })
    },

    update: {
        params: Joi.object({
            id: Joi.number().required()
        }),

        body: Joi.object({
            date: Joi.date().optional(),
            attendants: Joi.array().optional(),
            host: Joi.string().optional(),
            price: Joi.number().optional(),
            place: Joi.string().optional(),
            title: Joi.string().optional(),
            description: Joi.string().optional(),
            image: Joi.string().optional()
        })
    },

    partialUpdate: {
        params: Joi.object({
            id: Joi.number().required()
        }),

        body: Joi.object({
            date: Joi.date().optional(),
            attendants: Joi.array().optional(),
            host: Joi.string().optional(),
            price: Joi.number().optional(),
            place: Joi.string().optional(),
            title: Joi.string().optional(),
            description: Joi.string().optional(),
            image: Joi.string().optional()
        })
    }
};

export default eventValidation;
