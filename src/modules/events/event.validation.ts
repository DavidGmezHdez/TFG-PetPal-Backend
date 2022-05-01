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
            date: Joi.date(),
            attendants: Joi.array(),
            host: Joi.string(),
            price: Joi.number(),
            place: Joi.string(),
            title: Joi.string(),
            description: Joi.string(),
            image: Joi.string()
        })
    },

    partialUpdate: {
        params: Joi.object({
            id: Joi.number().required()
        }),

        body: Joi.object({
            date: Joi.date(),
            attendants: Joi.array(),
            host: Joi.string(),
            price: Joi.number(),
            place: Joi.string(),
            title: Joi.string(),
            description: Joi.string(),
            image: Joi.string()
        })
    }
};

export default eventValidation;
