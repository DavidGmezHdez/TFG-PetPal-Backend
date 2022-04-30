import { Joi } from "express-validation";

const petValidation = {
    create: {
        body: Joi.object({
            name: Joi.string().required(),
            type: Joi.string().required(),
            age: Joi.number().required(),
            color: Joi.string(),
            size: Joi.string(),
            specialTraits: Joi.array(),
            owner: Joi.string()
        })
    },

    update: {
        params: Joi.object({
            id: Joi.number().required()
        }),

        body: Joi.object({
            name: Joi.string(),
            type: Joi.string(),
            age: Joi.number(),
            color: Joi.string(),
            size: Joi.string(),
            specialTraits: Joi.array(),
            owner: Joi.string()
        })
    },

    partialUpdate: {
        params: Joi.object({
            id: Joi.number().required()
        }),

        body: Joi.object({
            name: Joi.string(),
            type: Joi.string(),
            age: Joi.number(),
            color: Joi.string(),
            size: Joi.string(),
            specialTraits: Joi.array(),
            owner: Joi.string()
        })
    }
};

export default petValidation;
