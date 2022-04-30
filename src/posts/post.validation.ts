import { Joi } from "express-validation";

const postValidation = {
    create: {
        body: Joi.object({
            text: Joi.string().required().max(300),
            author: Joi.string().required(),
            likes: Joi.number(),
            image: Joi.string()
        })
    },

    update: {
        params: Joi.object({
            id: Joi.number().required()
        }),

        body: Joi.object({
            text: Joi.string().max(300),
            author: Joi.string(),
            likes: Joi.number(),
            image: Joi.string()
        })
    },

    partialUpdate: {
        params: Joi.object({
            id: Joi.number().required()
        }),

        body: Joi.object({
            text: Joi.string().max(300),
            author: Joi.string(),
            likes: Joi.number(),
            image: Joi.string()
        })
    }
};

export default postValidation;
