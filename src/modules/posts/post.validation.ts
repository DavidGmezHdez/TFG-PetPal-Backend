import { Joi } from "express-validation";

const postValidation = {
    create: {
        body: Joi.object({
            text: Joi.string().required().max(300),
            author: Joi.string().required(),
            name: Joi.string().required(),
            likes: Joi.number(),
            image: Joi.string().allow("").optional()
        })
    },

    update: {
        params: Joi.object({
            id: Joi.string().required()
        }),

        body: Joi.object({
            text: Joi.string().max(300).optional(),
            author: Joi.string().optional(),
            name: Joi.string().optional(),
            likes: Joi.number().optional(),
            image: Joi.string().allow("").optional()
        })
    },

    partialUpdate: {
        params: Joi.object({
            id: Joi.string().required()
        }),

        body: Joi.object({
            text: Joi.string().max(300).optional(),
            author: Joi.string().optional(),
            name: Joi.string().optional(),
            likes: Joi.number().optional(),
            image: Joi.string().allow("").optional()
        })
    }
};

export default postValidation;
